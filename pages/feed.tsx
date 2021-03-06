import ErrorPage from "next/error";
import Link from "next/link";
import React from "react";
import Button from "../components/common/Button";
import Layout from "../components/Layout";
import PostRoll from "../components/PostRoll";
import useFeed from "../lib/useFeed";
import useSession from "../lib/useSession";

export interface feedProps {}

export default function Feed({}: feedProps) {
  const { session } = useSession({ redirectTo: "/login" });

  const { feed, error, isLoading } = useFeed();

  if (error) {
    return <ErrorPage statusCode={error.status} />;
  }

  return (
    <Layout
      title="Your Newsfeed"
      description="See your latest feed"
      isLoading={!session || isLoading}
    >
      <div className="header flex items-end justify-between mb-12 flex-col md:flex-row">
        <div className="title">
          <p className="text-4xl font-bold text-gray-800 mb-4">Your Newsfeed</p>
          <p className="text-2xl font-light text-gray-400">
            A collection of posts from you and users you follow
          </p>
        </div>
        <div className="text-end w-full sm:w-auto">
          <Link href="/create">
            <a>
              <Button className="w-full sm:w-auto">Create new post</Button>
            </a>
          </Link>
        </div>
      </div>
      <PostRoll posts={feed} />
    </Layout>
  );
}
