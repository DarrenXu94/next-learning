import Link from "next/link";
import React from "react";
import usePost from "../lib/usePost";
import useProfile from "../lib/useProfile";
import useSession from "../lib/useSession";

export interface profileProps {}

export default function profile({}: profileProps) {
  const { session } = useSession({ redirectTo: "/login" });

  const { profile } = useProfile(session?.username as string);

  const { getPostsByAuthor } = usePost();

  const { data: posts } = getPostsByAuthor(session?.username as string);

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
