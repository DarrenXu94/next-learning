import { useQuery, useQueryClient } from "react-query";
import { useSnapshot } from "valtio";
import {
  createPostWithToken,
  getAllPostsAPI,
  getPostsByAuthorWithoutToken,
  getPostsByIdWithoutToken,
} from "../services/post";
import { state } from "../store/store";
import Router from "next/router";
import { Post } from "../domains/post";

const handleProfilePosts = async (username: string) => {
  const res = await getPostsByAuthorWithoutToken({ username });
  if (res.status !== 200) {
    throw res.statusText;
  } else {
    return res.body;
  }
};

const handlePost = async (id: string) => {
  const res = await getPostsByIdWithoutToken({ id });
  if (res.status !== 200) {
    throw res.statusText;
  } else {
    return res.body;
  }
};

const handleGetAllPosts = async () => {
  const res = await getAllPostsAPI();
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

  const getPostsByAuthor = (username: string) => {
    return useQuery<[Post]>(
      ["profilePosts", username],
      () => handleProfilePosts(username),
      {
        enabled: !!session,
      }
    );
  };

  const getPostById = (id: string) => {
    return useQuery<Post>(["post", id], () => handlePost(id), {
      enabled: !!id,
    });
  };

  const getAllPosts = () => {
    return useQuery<[Post]>("allPosts", () => handleGetAllPosts());
  };

  return {
    createPost,
    handleProfilePosts,
    getPostsByAuthor,
    getPostById,
    getAllPosts,
  };
}
