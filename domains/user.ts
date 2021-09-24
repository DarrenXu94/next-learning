import { Post } from "./post";

export interface User {
  _id: string;
  username: string;
  email: string;
  posts: [Post];
  followers: [User];
  following: [User];
  avatar: string;
}
