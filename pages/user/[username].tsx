import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSnapshot } from "valtio";
import FollowButton from "../../components/FollowButton";
import useFollow from "../../lib/useFollow";
import usePost from "../../lib/usePost";
import useUser from "../../lib/useUser";
import { state } from "../../store/store";

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

  return (
    <div>
      {/* Render follow button if user !== session.user  */}
      {username && session && (
        <FollowButton session={session} username={username as string} />
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
