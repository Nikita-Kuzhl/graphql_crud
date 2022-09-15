import { User } from "./User";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  content: number;
  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
