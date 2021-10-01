import React, { useMemo } from "react";
import { Session } from "../domains/session";
import useFollow from "../lib/useFollow";
import Button from "./common/Button";
import toast from "react-hot-toast";

export interface FollowButtonProps {
  username: string;
  session: Session;
}

export default function FollowButton({ session, username }: FollowButtonProps) {
  const { followUser, unfollowUser } = useFollow(username);

  const handleClick = async () => {
    if (isFollowing) {
      const res = await unfollowUser(username);
      if (res) {
        toast.success(`Unfollowed ${username}`);
      }
    } else {
      const res = await followUser(username);
      if (res) {
        toast.success(`Followed ${username}`);
      }
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
    <Button onClick={handleClick}>{isFollowing ? "Unfollow" : "Follow"}</Button>
  );
}
