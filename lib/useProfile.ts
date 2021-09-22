import { useQuery } from "react-query";
import { useSnapshot } from "valtio";
import { Session } from "../domains/session";
import { getProfileWithToken } from "../services/profile";
import { state } from "../store/store";

export interface Profile {
  profileUsername: string;
  profileAvatar: string;
  isFollowing: boolean;
  counts: Counts;
}

export interface Counts {
  postCount: number;
  followerCount: number;
  followingCount: number;
}

export default function useProfile(username: string): { profile: Profile } {
  const { session } = useSnapshot(state);

  const handleProfile = async () => {
    const res = await getProfileWithToken({
      username,
      token: session?.token as string,
    });
    if (res.status !== 200) {
      return { error: res.statusText };
    }
    return res.body;
  };

  const { data: profile } = useQuery(
    ["profile", username],
    () => handleProfile(),
    { enabled: !!session }
  );

  // const getProfile = (username: string) => {
  // const profile = getProfileWithToken
  // }

  // return {getProfile}
  return { profile };
}
