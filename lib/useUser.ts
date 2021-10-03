import { useQuery } from "react-query";
import { useSnapshot } from "valtio";
import { Profile } from "../domains/profile";
import { User } from "../domains/user";
import { HTTPError } from "../interfaces/HTTP";
import { getProfileWithToken } from "../services/profile";
import { getAllUsersAPI } from "../services/user";
import { state } from "../store/store";

export default function useUser(username: string) {
  const { session } = useSnapshot(state);

  const handleUserByUsername = async (username: string) => {
    const res = await getProfileWithToken({
      username,
      token: session?.token as string,
    });
    if (res.status !== 200) {
      throw { statusText: res.statusText, status: res.status } as HTTPError;
    } else {
      return res.body;
    }
  };
  const { data: user, error } = useQuery<Profile, HTTPError>(
    ["user", username],
    () => handleUserByUsername(username),
    { enabled: !!session && !!username }
  );

  return { user, error };
}
