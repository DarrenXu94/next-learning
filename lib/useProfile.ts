import { useQuery } from "react-query";
import { useSnapshot } from "valtio";
import { Profile } from "../domains/profile";
import { Session } from "../domains/session";
import { HTTPError } from "../interfaces/HTTP";
import { getProfileWithToken } from "../services/profile";
import { state } from "../store/store";

export default function useProfile(username: string) {
  const { session } = useSnapshot(state);

  const handleProfile = async () => {
    const res = await getProfileWithToken({
      username,
      token: session?.token as string,
    });
    if (res.status !== 200) {
      throw { statusText: res.statusText, status: res.status } as HTTPError;
    }
    return res.body;
  };

  const { data: profile, error } = useQuery<Profile, HTTPError>(
    ["user", username],
    () => handleProfile(),
    { enabled: session && username != undefined && username.length > 0 }
  );

  return { profile, error };
}
