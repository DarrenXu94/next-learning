import Link from "next/link";
import React from "react";
import PostRoll from "../../components/PostRoll";
import usePost from "../../lib/usePost";

export interface PageIndexProps {}

export default function PageIndex({}: PageIndexProps) {
  const { getAllPosts } = usePost();
  const { data: posts } = getAllPosts();
  return (
    <div className="w-full bg-white p-12">
      <div className="header flex items-end justify-between mb-12 flex-col md:flex-row">
        <div className="title">
          <p className="text-4xl font-bold text-gray-800 mb-4">All Posts</p>
        </div>
      </div>
      <PostRoll posts={posts} />
    </div>
  );
}
