import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useMemo } from "react";
import { useSnapshot } from "valtio";
import FollowButton from "../../components/FollowButton";
import useFollow from "../../lib/useFollow";
import usePost from "../../lib/usePost";
import useUser from "../../lib/useUser";
import { state } from "../../store/store";
import Router from "next/router";
import InfoCard from "../../components/common/InfoCard";
import PostRoll from "../../components/PostRoll";
import UserRoll from "../../components/UserRoll";

export interface UserPageProps {}

export default function UserPage({}: UserPageProps) {
  const router = useRouter();
  const { username } = router.query;

  const { session } = useSnapshot(state);

  const { getPostsByAuthor } = usePost();

  const { data: posts } = getPostsByAuthor(username as string);

  const { getUserByUsername } = useUser();

  const { data: user } = getUserByUsername(username as string);

  const { followers, following } = useFollow(username as string);

  useEffect(() => {
    if (username == session?.username) {
      Router.replace(`/profile`);
    }
  }, [username, session]);

  const isFollower = useMemo(() => {
    if (!session) return false;
    return (
      session?.followers.filter((follower) => {
        return follower.username == username;
      }).length > 0
    );
  }, [session, username]);

  if (!session) {
    return <></>;
  }

  if (session.username == username) {
    return <></>;
  }

  return (
    <div className="bg-white rounded shadow max-w-screen-lg	m-auto p-5">
      <div className="flex justify-between">
        <div className="px-4 md:px-6 ">
          <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
            Viewing, {user?.profileUsername}
          </h1>
        </div>
        {username && session && (
          <FollowButton session={session} username={username as string} />
        )}
      </div>
      {/* Info on if this user is following you */}
      {username && session && (
        <h2 className="text-md text-gray-400 px-4 md:px-6 pb-10 pt-4">
          {isFollower
            ? "This user is following you"
            : "This user is not following you"}
        </h2>
      )}
      {user && (
        <div className="flex justify-evenly	">
          <InfoCard
            heading="Post Count"
            content={user.counts.postCount.toString()}
          />
          <InfoCard
            heading="Followers"
            content={user.counts.followerCount.toString()}
          />
          <InfoCard
            heading="Following"
            content={user.counts.followingCount.toString()}
          />
        </div>
      )}

      <div className="w-full p-12">
        <div className="header flex items-end justify-between mb-12 flex-col md:flex-row">
          <div className="title">
            <p className="text-4xl font-bold text-gray-800 mb-4">Posts</p>
          </div>
        </div>
        <PostRoll posts={posts} />

        <UserRoll users={following} title={"People you follow"} />
        <UserRoll users={followers} title={"Followers"} />
      </div>
    </div>
  );
}
