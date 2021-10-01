import { useQuery } from "react-query";
import { User } from "../domains/user";
import { getAllUsersAPI } from "../services/user";

const handleUsers = async () => {
  const res = await getAllUsersAPI();
  if (res.status !== 200) {
    throw res.statusText;
  } else {
    return res.body;
  }
};

export default function useAllUsers() {
  const { data: users } = useQuery<[User]>("users", () => handleUsers());

  return { users };
}
