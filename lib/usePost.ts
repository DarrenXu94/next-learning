import { useQuery, useQueryClient } from "react-query";
import { useSnapshot } from "valtio";
import {
  createPostWithToken,
  deletePostByIdAPI,
  getAllPostsAPI,
  getPostsByAuthorWithoutToken,
  getPostsByIdWithoutToken,
  searchPostsAPI,
  updatePostsAPI,
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

const handleDeletePostById = async (id: string, token: string) => {
  const res = await deletePostByIdAPI({ id, token });
  if (res.status !== 200) {
    throw res.statusText;
  } else {
    return res.body;
  }
};

const handleSearchPost = async (searchTerm: string) => {
  const res = await searchPostsAPI({ searchTerm });
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

  const searchPosts = (searchTerm: string) => {
    return useQuery<[Post]>(["searchPosts", searchTerm], () =>
      handleSearchPost(searchTerm)
    );
  };

  return {
    createPost,
    handleProfilePosts,
    getPostsByAuthor,
    getPostById,
    getAllPosts,
    deletePostById,
    searchPosts,
    updatePost,
  };
}
