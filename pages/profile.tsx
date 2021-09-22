import React from "react";
import useProfile from "../lib/useProfile";
import useSession from "../lib/useSession";

export interface profileProps {}

export default function profile({}: profileProps) {
  const { session } = useSession({ redirectTo: "/login" });

  const { profile } = useProfile(session?.username as string);

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
    </div>
  );
}
