import Link from "next/link";
import React from "react";
import PostRoll from "../components/PostRoll";
import SearchForm from "../components/SearchForm";
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
    <div>
      <SearchForm />

      <Link href="/create">
        <a>Create new post</a>
      </Link>

      <Link href="/post">
        <a>View all posts</a>
      </Link>

      <Link href="/user">
        <a>View all users</a>
      </Link>

      <h1>Your newsfeed</h1>
      <PostRoll posts={posts} />
    </div>
  );
}
