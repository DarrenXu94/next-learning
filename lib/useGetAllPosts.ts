import { useQuery } from "react-query";
import { Post } from "../domains/post";
import { HTTPError } from "../interfaces/HTTP";
import { getAllPostsAPI } from "../services/post";

const handleGetAllPosts = async () => {
  const res = await getAllPostsAPI();
  if (res.status !== 200) {
    throw { statusText: res.statusText, status: res.status } as HTTPError;
  } else {
    return res.body;
  }
};

export default function useGetAllPosts() {
  const {
    data: posts,
    error,
    isLoading,
  } = useQuery<[Post], HTTPError>("allPosts", () => handleGetAllPosts());

  return { posts, error, isLoading };
}
