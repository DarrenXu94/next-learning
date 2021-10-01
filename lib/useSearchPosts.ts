import { useQuery } from "react-query";
import { searchPostsAPI } from "../services/post";

const handleSearchPost = async (searchTerm: string) => {
  const res = await searchPostsAPI({ searchTerm });
  if (res.status !== 200) {
    throw res.statusText;
  } else {
    return res.body;
  }
};

export default function useSearchPosts(searchTerm: string) {
  const { data: posts } = useQuery(["searchPosts", searchTerm], () =>
    handleSearchPost(searchTerm)
  );

  return { posts };
}
