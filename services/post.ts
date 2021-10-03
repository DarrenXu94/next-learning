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
  try {
    const login = await fetch(`http://localhost:8080/create-post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body, token }),
    });
    if (login.status !== 200) {
      return {
        status: login.status,
        statusText: login.statusText,
      };
    }
    return {
      status: login.status,
      statusText: login.statusText,
      body: await login.json(),
    };
  } catch (e) {
    return {
      status: 500,
      statusText: e as string,
    };
  }
}

export async function getPostsByAuthorWithoutToken({
  username,
}: {
  username: string;
}): Promise<HTTPResponse> {
  try {
    const login = await fetch(
      `http://localhost:8080/profile/${username}/posts`,
      {
        method: "GET",
      }
    );

    if (login.status !== 200) {
      return {
        status: login.status,
        statusText: login.statusText,
      };
    }

    return {
      status: login.status,
      statusText: login.statusText,
      body: await login.json(),
    };
  } catch (e) {
    return {
      status: 500,
      statusText: e as string,
    };
  }
}
export async function getPostsByIdWithoutToken({
  id,
}: {
  id: string;
}): Promise<HTTPResponse> {
  try {
    const login = await fetch(`http://localhost:8080/post/${id}`, {
      method: "GET",
    });

    if (login.status !== 200) {
      return {
        status: login.status,
        statusText: login.statusText,
      };
    }

    return {
      status: login.status,
      statusText: login.statusText,
      body: await login.json(),
    };
  } catch (e) {
    return {
      status: 500,
      statusText: e as string,
    };
  }
}

export async function getAllPostsAPI(): Promise<HTTPResponse> {
  try {
    const posts = await fetch(`http://localhost:8080/post`, {
      method: "GET",
    });
    if (posts.status !== 200) {
      return {
        status: posts.status,
        statusText: posts.statusText,
      };
    }

    return {
      status: posts.status,
      statusText: posts.statusText,
      body: await posts.json(),
    };
  } catch (e) {
    return {
      status: 500,
      statusText: e as string,
    };
  }
}

export async function deletePostByIdAPI({
  id,
  token,
}: {
  id: string;
  token: string;
}): Promise<HTTPResponse> {
  try {
    const posts = await fetch(`http://localhost:8080/post/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    if (posts.status !== 200) {
      return {
        status: posts.status,
        statusText: posts.statusText,
      };
    }

    return {
      status: posts.status,
      statusText: posts.statusText,
      body: await posts.json(),
    };
  } catch (e) {
    return {
      status: 500,
      statusText: e as string,
    };
  }
}

export async function searchPostsAPI({
  searchTerm,
}: {
  searchTerm: string;
}): Promise<HTTPResponse> {
  try {
    const searchResult = await fetch(`http://localhost:8080/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchTerm }),
    });

    if (searchResult.status !== 200) {
      return {
        status: searchResult.status,
        statusText: searchResult.statusText,
      };
    }

    return {
      status: searchResult.status,
      statusText: searchResult.statusText,
      body: await searchResult.json(),
    };
  } catch (e) {
    return {
      status: 500,
      statusText: e as string,
    };
  }
}

export async function updatePostsAPI({
  token,
  title,
  body,
  id,
}: {
  token: string;
  title: string;
  body: string;
  id: string;
}): Promise<HTTPResponse> {
  try {
    const newPost = await fetch(`http://localhost:8080/post/${id}/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, title, body }),
    });

    if (newPost.status !== 200) {
      return {
        status: newPost.status,
        statusText: newPost.statusText,
      };
    }

    return {
      status: newPost.status,
      statusText: newPost.statusText,
      body: await newPost.json(),
    };
  } catch (e) {
    return {
      status: 500,
      statusText: e as string,
    };
  }
}
