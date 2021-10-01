import { useQuery } from "react-query";
import { getPostsByAuthorWithoutToken } from "../services/post";

const handleProfilePosts = async (username: string) => {
  const res = await getPostsByAuthorWithoutToken({ username });
  if (res.status !== 200) {
    throw res.statusText;
  } else {
    return res.body;
  }
};

export default function useGetPostByAuthor(username: string) {
  const { data: posts } = useQuery(["profilePosts", username], () =>
    handleProfilePosts(username)
  );

  return { posts };
}
