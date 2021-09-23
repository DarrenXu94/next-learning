import { Post } from "./post";

export interface User {
  username: string;
  email: string;
  posts: [Post];
  followers: [User];
  following: [User];
  avatar: string;
}
