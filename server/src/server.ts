import { Post } from "./db/entity/Post";
import { User } from "./db/entity/User";
import { AppDataSource } from "./db/index";
import express from "express";
import "reflect-metadata";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema";

const app = express();

//DB

AppDataSource.initialize()
  .then(() => console.log("Success connection DB"))
  .catch((err) => console.error(err));

//resolver

const root = {
  getAllUsers: async () => {
    const users = await AppDataSource.getRepository(User).find({
      relations: { posts: true },
    });
    return users;
  },
  getUser: async ({ id }) => {
    const user = await AppDataSource.getRepository(User).findOne({
      where: { id },
      relations: { posts: true },
    });
    return user;
  },
  createUser: async ({ input }) => {
    const user = AppDataSource.getRepository(User).create(input);
    const results = await AppDataSource.getRepository(User).save(user);
    return results;
  },
  createPost: async ({ id, input }) => {
    const user = await AppDataSource.getRepository(User).findOneBy({ id });
    const post = new Post();
    post.content = input.content;
    post.title = input.title;
    post.user = user;
    const results = await AppDataSource.getRepository(Post).save(post);
    return results;
  },
  getUserPosts: async ({ id }) => {
    const posts = await AppDataSource.getRepository(Post).find({
      where: { user: { id } },
    });
    return posts;
  },
  updatePost: async ({ id, input }) => {
    const post = await AppDataSource.getRepository(Post).findOneBy({ id });
    post.title = input.title;
    post.content = input.content;
    const result = await AppDataSource.getRepository(Post).save(post);
    return result;
  },
  deletePost: async ({ id }) => {
    await AppDataSource.getRepository(Post).delete({ id });
    return "Ok";
  },
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
    rootValue: root,
  })
);

app.listen(8080, () => console.log("Server listen on port - 8080"));
