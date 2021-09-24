import Link from "next/link";
import React from "react";
import usePost from "../../lib/usePost";

export interface PageIndexProps {}

export default function PageIndex({}: PageIndexProps) {
  const { getAllPosts } = usePost();
  const { data: posts } = getAllPosts();
  return (
    <div>
      <h2>Posts</h2>
      {posts &&
        posts.map((post) => {
          return (
            <div key={post._id}>
              <Link href={`/post/${post._id}`}>
                <a>
                  <h4>{post.title}</h4>
                  <p>{post.body}</p>
                </a>
              </Link>
            </div>
          );
        })}
    </div>
  );
}
