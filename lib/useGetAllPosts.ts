import { useQuery } from "react-query";
import { getAllPostsAPI } from "../services/post";

const handleGetAllPosts = async () => {
  const res = await getAllPostsAPI();
  if (res.status !== 200) {
    throw res.statusText;
  } else {
    return res.body;
  }
};

export default function useGetAllPosts() {
  const { data: posts } = useQuery("allPosts", () => handleGetAllPosts());

  return { posts };
}
