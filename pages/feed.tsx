import Link from "next/link";
import React from "react";
import Button from "../components/common/Button";
import PostRoll from "../components/PostRoll";
import useFeed from "../lib/useFeed";
import useSession from "../lib/useSession";

export interface feedProps {}

export default function feed({}: feedProps) {
  const { session } = useSession({ redirectTo: "/login" });

  const { getFeed } = useFeed();
  const { data: posts } = getFeed();

  if (!session) {
    return <div>loading...</div>;
  }
  return (
    <div className="w-full bg-white p-12">
      <div className="header flex items-end justify-between mb-12 flex-col md:flex-row">
        <div className="title">
          <p className="text-4xl font-bold text-gray-800 mb-4">Your Newsfeed</p>
          <p className="text-2xl font-light text-gray-400">
            A collection of posts from you and users you follow
          </p>
        </div>
        <div className="text-end w-full sm:w-auto">
          <Button className="w-full sm:w-auto">
            <Link href="/create">
              <a>Create new post</a>
            </Link>
          </Button>
        </div>
      </div>
      <PostRoll posts={posts} />
    </div>
  );
}
