import { useQuery } from "react-query";
import { useSnapshot } from "valtio";
import { state } from "../store/store";
import { Post } from "../domains/post";
import { getFeedWithToken } from "../services/feed";

const handleFeed = async (token) => {
  const res = await getFeedWithToken({
    token,
  });
  if (res.status !== 200) {
    return { error: res.statusText };
  }
  return res.body;
};
export default function useFeed() {
  const { session } = useSnapshot(state);

  const { data: feed, error } = useQuery(
    "feed",
    () => handleFeed(session?.token as string),
    {
      enabled: !!session,
    }
  );

  return { feed, error };
}
