import { HTTPResponse } from "../interfaces/HTTP";

export async function createPostWithToken({
  title,
  body,
  token,
}: {
  title: string;
  body: string;
  token: string;
}): Promise<HTTPResponse> {
  // Attempt to log in
  const login = await fetch(`http://localhost:8080/create-post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body, token }),
  });

  return {
    status: login.status,
    statusText: login.statusText,
    body: await login.json(),
  };
}

export async function getPostsByAuthorWithoutToken({
  username,
}: {
  username: string;
}): Promise<HTTPResponse> {
  const login = await fetch(`http://localhost:8080/profile/${username}/posts`, {
    method: "GET",
  });

  return {
    status: login.status,
    statusText: login.statusText,
    body: await login.json(),
  };
}
export async function getPostsByIdWithoutToken({
  id,
}: {
  id: string;
}): Promise<HTTPResponse> {
  const login = await fetch(`http://localhost:8080/post/${id}`, {
    method: "GET",
  });

  return {
    status: login.status,
    statusText: login.statusText,
    body: await login.json(),
  };
}

export async function getAllPostsAPI(): Promise<HTTPResponse> {
  const posts = await fetch(`http://localhost:8080/post`, {
    method: "GET",
  });

  return {
    status: posts.status,
    statusText: posts.statusText,
    body: await posts.json(),
  };
}

export async function deletePostByIdAPI({
  id,
  token,
}: {
  id: string;
  token: string;
}): Promise<HTTPResponse> {
  const posts = await fetch(`http://localhost:8080/post/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  return {
    status: posts.status,
    statusText: posts.statusText,
    body: await posts.json(),
  };
}

export async function searchPostsAPI({
  searchTerm,
}: {
  searchTerm: string;
}): Promise<HTTPResponse> {
  const searchResult = await fetch(`http://localhost:8080/search`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ searchTerm }),
  });

  return {
    status: searchResult.status,
    statusText: searchResult.statusText,
    body: await searchResult.json(),
  };
}
