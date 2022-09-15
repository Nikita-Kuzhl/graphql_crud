export interface GetUser {
  username: string;
  age: number;
  posts: IPost[];
}

export interface GetUserData {
  getUser: GetUser;
}
export interface IPost {
  id: string;
  title: string;
  content: string;
}

export interface InputPost {
  title?: string;
  content?: string;
}
