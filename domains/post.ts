import { User } from "./user";

export interface Post {
  _id: string;
  title: string;
  body: string;
  createdDate: string;
  author: User;
  isVisitorOwner: boolean;
}
