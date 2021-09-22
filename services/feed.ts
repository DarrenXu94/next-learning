import { HTTPResponse } from "../interfaces/HTTP";

export async function getFeedWithToken({
  token,
}: {
  token: string;
}): Promise<HTTPResponse> {
  // Attempt to log in
  const login = await fetch(`http://localhost:8080/getHomeFeed`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  return {
    status: login.status,
    statusText: login.statusText,
    body: await login.json(),
  };
}
