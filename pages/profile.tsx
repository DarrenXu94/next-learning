import React from "react";
import { useQuery } from "react-query";
import { Post } from "../domains/post";
import usePost from "../lib/usePost";
import useProfile from "../lib/useProfile";
import useSession from "../lib/useSession";

export interface profileProps {}

export default function profile({}: profileProps) {
  const { session } = useSession({ redirectTo: "/login" });

  const { profile } = useProfile(session?.username as string);

  const { handleProfilePosts } = usePost();

  const { data: posts } = useQuery<[Post]>(
    ["profilePosts", session?.username],
    () => handleProfilePosts(session?.username as string),
    {
      enabled: !!session,
    }
  );

  if (!session) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h1>This is your profile</h1>
      <p>
        Username:
        {session.username}
      </p>
      {profile && (
        <>
          <p>Profile</p>
          <ul>
            <li>Post count: {profile.counts.postCount}</li>
            <li>Follower count: {profile.counts.followerCount}</li>
            <li>Following count: {profile.counts.followingCount}</li>
          </ul>
        </>
      )}

      <h2>Posts</h2>

      {posts &&
        posts.map((post) => {
          return (
            <div key={post._id}>
              <h4>{post.title}</h4>
              <p>{post.body}</p>
            </div>
          );
        })}
    </div>
  );
}
