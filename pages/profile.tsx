import Link from "next/link";
import React from "react";
import InfoCard from "../components/common/InfoCard";
import PostRoll from "../components/PostRoll";
import UserCard from "../components/UserCard";
import UserRoll from "../components/UserRoll";
import useFollow from "../lib/useFollow";
import usePost from "../lib/usePost";
import useProfile from "../lib/useProfile";
import useSession from "../lib/useSession";

export interface profileProps {}

export default function Profile({}: profileProps) {
  const { session } = useSession({ redirectTo: "/login" });

  const { profile } = useProfile(session?.username as string);

  const { getPostsByAuthor } = usePost();

  const { data: posts } = getPostsByAuthor(session?.username as string);

  const { followers, following } = useFollow(session?.username as string);
  // const { data: followers } = getFollowersOfUser(session?.username as string);
  // const { data: following } = getUserFollowing(session?.username as string);

  if (!session) {
    return <div>loading...</div>;
  }

  return (
    <div className="bg-white rounded shadow max-w-screen-lg	m-auto p-5">
      <div className="pb-10 px-4 md:px-6">
        <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
          Welcome back, {session.username}
        </h1>
      </div>
      {profile && (
        <div className="flex justify-evenly	">
          <InfoCard
            heading="Post Count"
            content={profile.counts.postCount.toString()}
          />
          <InfoCard
            heading="Followers"
            content={profile.counts.followerCount.toString()}
          />
          <InfoCard
            heading="Following"
            content={profile.counts.followingCount.toString()}
          />
        </div>
      )}

      <div className="w-full p-12">
        <div className="header flex items-end justify-between mb-12 flex-col md:flex-row">
          <div className="title">
            <p className="text-4xl font-bold text-gray-800 mb-4">Your Posts</p>
          </div>
        </div>
        <PostRoll posts={posts} />

        <UserRoll users={following} title={"People you follow"} />
        <UserRoll users={followers} title={"Followers"} />
      </div>
    </div>
  );
}
