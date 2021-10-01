import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useSnapshot } from "valtio";
import { Session } from "../domains/session";
import { User } from "../domains/user";
import {
  FollowUserAPI,
  getFollowersOfUserAPI,
  getUserFollowingAPI,
  UnfollowUserAPI,
} from "../services/follow";
import {
  addFollowerToSession,
  removeFollowerFromSession,
  state,
} from "../store/store";
import { useLocalStorage } from "./useLocalStorage";

const handleFollowers = async (username: string) => {
  const res = await getFollowersOfUserAPI({ username });
  if (res.status !== 200) {
    throw res.statusText;
  } else {
    return res.body;
  }
};

const handleFollowing = async (username: string) => {
  const res = await getUserFollowingAPI({ username });
  if (res.status !== 200) {
    throw res.statusText;
  } else {
    return res.body;
  }
};
export default function useFollow(username: string) {
  const { session } = useSnapshot(state);
  const queryClient = useQueryClient();
  const [name, setSession] = useLocalStorage<Session | null>("session", null);

  // When then session gets updated to add or remove following, update the storage cookie
  useEffect(() => {
    if (session) {
      setSession(session as Session);
    }
  }, [session, setSession]);

  const followUser = async (username: string) => {
    const res = await FollowUserAPI({
      username,
      token: session?.token as string,
    });
    if (res.status !== 200) {
      throw res.statusText;
    } else {
      // Update session here
      addFollowerToSession({ username });

      // Invalidate
      queryClient.invalidateQueries(["user", username]);
      queryClient.invalidateQueries("followers");

      return res.body;
    }
  };

  const unfollowUser = async (username: string) => {
    const res = await UnfollowUserAPI({
      username,
      token: session?.token as string,
    });
    if (res.status !== 200) {
      throw res.statusText;
    } else {
      removeFollowerFromSession(username);
      queryClient.invalidateQueries(["user", username]);
      queryClient.invalidateQueries("followers");

      return res.body;
    }
  };

  const { data: following } = useQuery(
    ["following", username],
    () => handleFollowing(username),
    {
      enabled: !!username,
    }
  );

  const { data: followers } = useQuery(
    ["followers", username],
    () => handleFollowers(username),
    {
      enabled: !!username,
    }
  );

  return { followers, following, followUser, unfollowUser };
}
