import { HTTPResponse } from "../interfaces/HTTP";

export async function getFeedWithToken({
  token,
}: {
  token: string;
}): Promise<HTTPResponse> {
  try {
    const feed = await fetch(`http://localhost:8080/getHomeFeed`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (feed.status !== 200) {
      return {
        status: feed.status,
        statusText: feed.statusText,
      };
    }

    return {
      status: feed.status,
      statusText: feed.statusText,
      body: await feed.json(),
    };
  } catch (e) {
    return {
      status: 500,
      statusText: e as string,
    };
  }
}
