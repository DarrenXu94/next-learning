import { useQuery } from "react-query";
import { useSnapshot } from "valtio";
import { Profile } from "../domains/profile";
import { Session } from "../domains/session";
import { getProfileWithToken } from "../services/profile";
import { state } from "../store/store";

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
    ["user", username],
    () => handleProfile(),
    { enabled: !!session }
  );

  return { profile };
}
