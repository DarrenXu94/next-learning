import { server } from "../config";
import { HTTPResponse } from "../interfaces/HTTP";

export async function getFeedWithToken({
  token,
}: {
  token: string;
}): Promise<HTTPResponse> {
  try {
    const feed = await fetch(`${server}/api/feed`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token,
      },
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
