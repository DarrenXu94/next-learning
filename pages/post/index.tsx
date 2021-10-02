import React from "react";
import PostRoll from "../../components/PostRoll";
import useGetAllPosts from "../../lib/useGetAllPosts";

export interface PageIndexProps {}

export default function PageIndex({}: PageIndexProps) {
  const { posts } = useGetAllPosts();
  return (
    <div className="w-full bg-white p-12 max-w-screen-lg m-auto">
      <div className="header flex items-end justify-between mb-12 flex-col md:flex-row">
        <div className="title">
          <p className="text-4xl font-bold text-gray-800 mb-4">All Posts</p>
        </div>
      </div>
      <PostRoll posts={posts} />
    </div>
  );
}
