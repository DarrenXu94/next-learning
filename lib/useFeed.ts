import { useQuery } from "react-query";
import { useSnapshot } from "valtio";
import { HTTPError, HTTPResponse } from "../interfaces/HTTP";
import { getFeedWithToken } from "../services/feed";
import { state } from "../store/store";
import Router from "next/router";
import { Post } from "../domains/post";

const handleFeed = async (token) => {
  const res = await getFeedWithToken({
    token,
  });
  if (res.status !== 200) {
    throw { statusText: res.statusText, status: res.status } as HTTPError;
  }
  return res.body;
};
export default function useFeed() {
  const { session } = useSnapshot(state);

  const { data: feed, error } = useQuery<[Post], HTTPError>(
    "feed",
    () => handleFeed(session?.token as string),
    {
      enabled: !!session,
    }
  );

  return { feed, error };
}
