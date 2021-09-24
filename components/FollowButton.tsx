import React, { useMemo } from "react";
import { Session } from "../domains/session";
import useFollow from "../lib/useFollow";

export interface FollowButtonProps {
  username: string;
  session: Session;
}

export default function FollowButton({ session, username }: FollowButtonProps) {
  const { followUser, unfollowUser } = useFollow();

  const handleClick = async () => {
    if (isFollowing) {
      const res = await unfollowUser(username);
    } else {
      const res = await followUser(username);
    }
  };

  const isFollowing = useMemo(() => {
    return (
      session.following.filter((follower) => {
        return follower.username == username;
      }).length > 0
    );
  }, [session, username]);

  if (session.username == username) {
    return <></>;
  }

  return (
    <div>
      <button onClick={handleClick}>
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
}
