import { useQuery } from "react-query";
import { useSnapshot } from "valtio";
import { Profile } from "../domains/profile";
import { User } from "../domains/user";
import { getProfileWithToken } from "../services/profile";
import { getAllUsersAPI } from "../services/user";
import { state } from "../store/store";

export default function useUser() {
  const { session } = useSnapshot(state);

  const handleUsers = async () => {
    const res = await getAllUsersAPI();
    if (res.status !== 200) {
      throw res.statusText;
    } else {
      return res.body;
    }
  };

  const getAllUsers = () => {
    return useQuery<[User]>("user", () => handleUsers());
  };

  const handleUserByUsername = async (username: string) => {
    const res = await getProfileWithToken({
      username,
      token: session?.token as string,
    });
    if (res.status !== 200) {
      throw res.statusText;
    } else {
      return res.body;
    }
  };

  const getUserByUsername = (username: string) => {
    return useQuery<Profile>(
      ["user", username],
      () => handleUserByUsername(username),
      { enabled: !!session && !!username }
    );
  };

  return { getAllUsers, getUserByUsername };
}
