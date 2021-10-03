import ErrorPage from "next/error";
import React from "react";
import InfoCard from "../components/common/InfoCard";
import PostRoll from "../components/PostRoll";
import UserRoll from "../components/UserRoll";
import useFollow from "../lib/useFollow";
import useGetPostByAuthor from "../lib/useGetPostsByAuthor";
import useProfile from "../lib/useProfile";
import useSession from "../lib/useSession";

export interface profileProps {}

export default function Profile({}: profileProps) {
  const { session } = useSession({ redirectTo: "/login" });

  const { profile, error } = useProfile(session?.username as string);

  const { posts } = useGetPostByAuthor(session?.username as string);

  const { followers, following, followersError, followingError } = useFollow(
    session?.username as string
  );

  if (!session) {
    return <div>loading...</div>;
  }

  if (error || followingError || followersError) {
    if (error) {
      return <ErrorPage statusCode={error.status} />;
    }
    if (followingError) {
      return <ErrorPage statusCode={followingError.status} />;
    }
    if (followersError) {
      return <ErrorPage statusCode={followersError.status} />;
    }
  }

  return (
    <div className="bg-white rounded shadow max-w-screen-lg	m-auto p-12">
      <div className="pb-10 ">
        <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
          Welcome back, {session.username}
        </h1>
      </div>
      {profile && (
        <div className="flex justify-evenly	flex-wrap">
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

      <div className="w-full py-12">
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
