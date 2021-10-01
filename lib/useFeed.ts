import { useQuery } from "react-query";
import { useSnapshot } from "valtio";
import { state } from "../store/store";
import { Post } from "../domains/post";
import { getFeedWithToken } from "../services/feed";

export default function useFeed() {
  const { session } = useSnapshot(state);

  const { data: feed } = useQuery("feed", () => handleFeed(), {
    enabled: !!session,
  });

  const handleFeed = async () => {
    const res = await getFeedWithToken({
      token: session?.token as string,
    });
    if (res.status !== 200) {
      return { error: res.statusText };
    }
    return res.body;
  };

  // const getFeed = () => {
  //   return useQuery<[Post]>("feed", () => handleFeed(), {
  //     enabled: !!session,
  //   });
  // };

  return { feed };
}
