import React from "react";
import useGetPostByAuthor from "../lib/useGetPostsByAuthor";
import PostRoll from "./PostRoll";

export interface ProfilePostsProps {
  username: string;
}

export default function ProfilePosts({ username }: ProfilePostsProps) {
  const { posts } = useGetPostByAuthor(username);

  return <PostRoll posts={posts} />;
}
