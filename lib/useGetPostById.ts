import { useQuery } from "react-query";
import { getPostsByIdWithoutToken } from "../services/post";

const handlePost = async (id: string) => {
  const res = await getPostsByIdWithoutToken({ id });
  if (res.status !== 200) {
    throw res.statusText;
  } else {
    return res.body;
  }
};

export default function useGetPostById(id: string) {
  const { data: post } = useQuery(["post", id], () => handlePost(id));

  return { post };
}
