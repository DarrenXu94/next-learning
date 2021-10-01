import Router from "next/router";
import { useQueryClient } from "react-query";
import { useSnapshot } from "valtio";
import {
  createPostWithToken,
  deletePostByIdAPI,
  updatePostsAPI,
} from "../services/post";
import { state } from "../store/store";

const handleDeletePostById = async (id: string, token: string) => {
  const res = await deletePostByIdAPI({ id, token });
  if (res.status !== 200) {
    throw res.statusText;
  } else {
    return res.body;
  }
};

const handleUpdatePost = async ({ id, token, title, body }) => {
  const res = await updatePostsAPI({ id, token, title, body });
  if (res.status !== 200) {
    throw res.statusText;
  } else {
    return res.body;
  }
};

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

  const deletePostById = async (id: string) => {
    const res = await handleDeletePostById(id, session?.token as string);
    if (res) {
      queryClient.invalidateQueries("feed");
      queryClient.invalidateQueries("profilePosts");
    }
    return res;
  };

  const updatePost = async ({ title, body, id }) => {
    const res = await handleUpdatePost({
      id,
      title,
      body,
      token: session?.token as string,
    });
    if (res) {
      queryClient.invalidateQueries(["post", id]);
      queryClient.invalidateQueries("feed");
      queryClient.invalidateQueries("profilePosts");
    }
    return res;
  };

  return {
    createPost,
    deletePostById,
    updatePost,
  };
}
