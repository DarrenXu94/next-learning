import { useQuery } from "react-query";
import { User } from "../domains/user";
import { getAllUsersAPI } from "../services/user";

export default function useUser() {
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
  return { getAllUsers };
}
