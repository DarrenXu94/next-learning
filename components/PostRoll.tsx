import Link from "next/link";
import React from "react";
import { Post } from "../domains/post";

export interface PostRollProps {
  posts: Post[] | undefined;
}

export default function PostRoll({ posts }: PostRollProps) {
  return (
    <>
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
    </>
  );
}
