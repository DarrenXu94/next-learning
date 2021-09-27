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

export interface UserPageProps {}

export default function UserPage({}: UserPageProps) {
  const router = useRouter();
  const { username } = router.query;

  const { session } = useSnapshot(state);

  const { getPostsByAuthor } = usePost();

  const { data: posts } = getPostsByAuthor(username as string);

  const { getUserByUsername } = useUser();

  const { data: user } = getUserByUsername(username as string);

  const { getFollowersOfUser, getUserFollowing } = useFollow();

  const { data: followers } = getFollowersOfUser(username as string);
  const { data: following } = getUserFollowing(username as string);

  useEffect(() => {
    if (username == session?.username) {
      Router.push(`/profile`);
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
    <div>
      {/* Follow button for following */}
      {username && session && (
        <FollowButton session={session} username={username as string} />
      )}
      {/* Info on if this user is following you */}
      {username && session && (
        <div>
          {isFollower
            ? "This user is following you"
            : "This user is not following you"}
        </div>
      )}
      <h2>User</h2>
      {user && user.profileUsername}
      <h2>Followers</h2>
      {followers &&
        followers.map((follower) => {
          return <div key={follower.username}>{follower.username}</div>;
        })}
      <h2>Following</h2>
      {following &&
        following.map((follower) => {
          return <div key={follower.username}>{follower.username}</div>;
        })}
      <h2>Posts</h2>
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
    </div>
  );
}
