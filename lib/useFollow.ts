import { useQuery, useQueryClient } from "react-query";
import { useSnapshot } from "valtio";
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
export default function useFollow() {
  const { session } = useSnapshot(state);
  const queryClient = useQueryClient();

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

      return res.body;
    }
  };

  const getFollowersOfUser = (username: string) => {
    return useQuery<[User]>(
      ["followers", username],
      () => handleFollowers(username),
      { enabled: !!username }
    );
  };

  const getUserFollowing = (username: string) => {
    return useQuery<[User]>(
      ["following", username],
      () => handleFollowing(username),
      { enabled: !!username }
    );
  };

  return { getFollowersOfUser, getUserFollowing, followUser, unfollowUser };
}
