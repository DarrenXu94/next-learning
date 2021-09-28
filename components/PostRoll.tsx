import NextLink from "next/link";
import React from "react";
import { Post } from "../domains/post";
import Card from "./common/Card";
import Link from "./common/Link";

export interface PostRollProps {
  posts: Post[] | undefined;
}

export default function PostRoll({ posts }: PostRollProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
        {posts &&
          posts.map((post) => {
            return (
              <div key={post._id}>
                <Link href={`/post/${post._id}`}>
                  <Card user={post.author} title={post.title}>
                    {post.body}
                  </Card>
                </Link>
              </div>
            );
          })}
      </div>
    </>
  );
}
