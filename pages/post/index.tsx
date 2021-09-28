import Link from "next/link";
import React from "react";
import PostRoll from "../../components/PostRoll";
import usePost from "../../lib/usePost";

export interface PageIndexProps {}

export default function PageIndex({}: PageIndexProps) {
  const { getAllPosts } = usePost();
  const { data: posts } = getAllPosts();
  return (
    <div>
      <h2>Posts</h2>
      <PostRoll posts={posts} />
    </div>
  );
}
