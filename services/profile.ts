import { server } from "../config";
import { HTTPResponse } from "../interfaces/HTTP";

export async function getProfileWithToken({
  username,
  token,
}: {
  username: string;
  token: string;
}): Promise<HTTPResponse> {
  // Attempt to log in
  try {
    const login = await fetch(`${server}/api/user/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      // body: JSON.stringify({ username, token }),
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
