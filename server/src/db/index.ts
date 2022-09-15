import { Post } from "./entity/Post";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "db.sqlite",
  entities: [User, Post],
  synchronize: true,
  logging: true,
});
