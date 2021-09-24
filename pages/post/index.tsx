import React from "react";
import usePost from "../../lib/usePost";

export interface PageIndexProps {}

export default function PageIndex({}: PageIndexProps) {
  const { getAllPosts } = usePost();
  const { data: posts } = getAllPosts();
  return (
    <div>
      {posts &&
        posts.map((post) => {
          return <div key={post._id}>{post.title}</div>;
        })}
    </div>
  );
}
