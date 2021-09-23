import { useQuery, useQueryClient } from "react-query";
import { useSnapshot } from "valtio";
import {
  createPostWithToken,
  getPostsByAuthorWithoutToken,
  getPostsByIdWithoutToken,
} from "../services/post";
import { state } from "../store/store";
import Router from "next/router";
import { Post } from "../domains/post";

export default function usePost() {
  const { session } = useSnapshot(state);
  const queryClient = useQueryClient();

  const createPost = async ({
    title,
    body,
  }: {
    title: string;
    body: string;
  }) => {
    const res = await createPostWithToken({
      title,
      body,
      token: session?.token as string,
    });
    // Check if success
    if (res.status !== 200) {
      throw res.statusText;
    } else {
      Router.push(`/post/${res.body}`);

      // Mutate feed query
      queryClient.invalidateQueries("feed");
      queryClient.invalidateQueries("profilePosts");
    }
  };

  const handleProfilePosts = async (username: string) => {
    const res = await getPostsByAuthorWithoutToken({ username });
    if (res.status !== 200) {
      throw res.statusText;
    } else {
      return res.body;
    }
  };

  const getPostsByAuthor = (username: string) => {
    return useQuery<[Post]>(
      ["profilePosts", username],
      () => handleProfilePosts(username),
      {
        enabled: !!session,
      }
    );
  };

  const handlePost = async (id: string) => {
    const res = await getPostsByIdWithoutToken({ id });
    if (res.status !== 200) {
      throw res.statusText;
    } else {
      return res.body;
    }
  };

  const getPostById = (id: string) => {
    return useQuery<Post>(["post", id], () => handlePost(id), {
      enabled: !!id,
    });
  };

  return { createPost, handleProfilePosts, getPostsByAuthor, getPostById };
}
