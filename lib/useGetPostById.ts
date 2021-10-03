import { useQuery } from "react-query";
import { Post } from "../domains/post";
import { HTTPError } from "../interfaces/HTTP";
import { getPostsByIdWithoutToken } from "../services/post";

const handlePost = async (id: string) => {
  const res = await getPostsByIdWithoutToken({ id });
  if (res.status !== 200) {
    throw { statusText: res.statusText, status: res.status } as HTTPError;
  } else {
    return res.body;
  }
};

export default function useGetPostById(id: string) {
  const { data: post, error } = useQuery<Post, HTTPError>(["post", id], () =>
    handlePost(id)
  );

  return { post, error };
}
