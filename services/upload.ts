import { server } from "../config";
import { HTTPResponse } from "../interfaces/HTTP";

export async function uploadImage({
  file,
  token,
}: {
  file;
  token: string;
}): Promise<HTTPResponse> {
  // Attempt to log in
  try {
    const formData = new FormData();
    formData.append("file", file);
    const login = await fetch(`${server}/api/file`, {
      method: "POST",
      headers: {
        token: token,
      },
      body: formData,
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

export async function deleteImagesByUrlAPI({
  urls,
  token,
}: {
  urls: string[];
  token: string;
}): Promise<HTTPResponse> {
  try {
    const posts = await fetch(`${server}/api/removeUrls`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, urls }),
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
