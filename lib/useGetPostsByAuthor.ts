import { useQuery } from "react-query";
import { Post } from "../domains/post";
import { HTTPError } from "../interfaces/HTTP";
import { getPostsByAuthorWithoutToken } from "../services/post";

const handleProfilePosts = async (username: string) => {
  const res = await getPostsByAuthorWithoutToken({ username });
  if (res.status !== 200) {
    throw { statusText: res.statusText, status: res.status } as HTTPError;
  } else {
    return res.body;
  }
};

export default function useGetPostByAuthor(username: string) {
  const { data: posts, error } = useQuery<[Post], HTTPError>(
    ["profilePosts", username],
    () => handleProfilePosts(username)
  );

  return { posts, error };
}
