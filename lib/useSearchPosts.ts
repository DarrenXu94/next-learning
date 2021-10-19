import { useQuery } from "react-query";
import { Post } from "../domains/post";
import { HTTPError } from "../interfaces/HTTP";
import { searchPostsAPI } from "../services/post";

const handleSearchPost = async (searchTerm: string) => {
  const res = await searchPostsAPI({ searchTerm });
  if (res.status !== 200) {
    throw { statusText: res.statusText, status: res.status } as HTTPError;
  } else {
    return res.body;
  }
};

export default function useSearchPosts(searchTerm: string) {
  const {
    data: posts,
    error,
    isLoading,
  } = useQuery<[Post], HTTPError>(["searchPosts", searchTerm], () =>
    handleSearchPost(searchTerm)
  );

  return { posts, error, isLoading };
}
