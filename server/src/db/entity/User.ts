import { Post } from "./Post";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  age: number;
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
