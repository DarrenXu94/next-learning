import { HTTPResponse } from "../interfaces/HTTP";

export async function getProfileWithToken({
  username,
  token,
}: {
  username: string;
  token: string;
}): Promise<HTTPResponse> {
  // Attempt to log in
  const login = await fetch(`http://localhost:8080/profile/${username}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, token }),
  });

  return {
    status: login.status,
    statusText: login.statusText,
    body: await login.json(),
  };
}
