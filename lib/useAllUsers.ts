import { useQuery } from "react-query";
import { User } from "../domains/user";
import { HTTPError } from "../interfaces/HTTP";
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
  const { data: users, error } = useQuery<[User], HTTPError>("users", () =>
    handleUsers()
  );

  return { users, error };
}
