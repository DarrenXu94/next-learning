import React from "react";
import useFeed from "../lib/useFeed";
import useSession from "../lib/useSession";

export interface feedProps {}

export default function feed({}: feedProps) {
  const { session } = useSession({ redirectTo: "/login" });

  const { feed } = useFeed();

  console.log({ feed });

  if (!session) {
    return <div>loading...</div>;
  }
  return <div>Your newsfeed</div>;
}
