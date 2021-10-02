import { HTTPResponse } from "../interfaces/HTTP";

export async function getFeedWithToken({
  token,
}: {
  token: string;
}): Promise<HTTPResponse> {
  const feed = await fetch(`http://localhost:8080/getHomeFeed`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  return {
    status: feed.status,
    statusText: feed.statusText,
    body: await feed.json(),
  };
}
