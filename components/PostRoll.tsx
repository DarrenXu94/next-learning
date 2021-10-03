import NextLink from "next/link";
import React from "react";
import { Post } from "../domains/post";
import Card from "./common/Card";
import Link from "./common/Link";
import * as sanitizeHtml from "sanitize-html";

export interface PostRollProps {
  posts: Post[] | undefined;
}

export default function PostRoll({ posts }: PostRollProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-12">
      {posts &&
        posts.map((post) => {
          return (
            <div key={post._id}>
              <Link href={`/post/${post._id}`}>
                <Card user={post.author} title={post.title}>
                  {sanitizeHtml(post.body, { allowedTags: [] })}
                </Card>
              </Link>
            </div>
          );
        })}
      {posts && !posts.length && (
        <div>
          <h3 className="text-2xl font-semibold font-display text-black dark:text-white sm:text-3xl">
            No posts to show
          </h3>
        </div>
      )}
    </div>
  );
}
