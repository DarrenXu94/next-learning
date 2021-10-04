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
    const login = await fetch(`http://localhost:8080/image`, {
      method: "POST",
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
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
