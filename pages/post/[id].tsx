import { useRouter } from "next/router";
import React from "react";
import usePost from "../../lib/usePost";
import useSession from "../../lib/useSession";

export interface PostPageProps {}

export default function PostPage({}: PostPageProps) {
  const { session } = useSession({ redirectTo: "/login" });

  const router = useRouter();
  const { id } = router.query;

  const { getPostById } = usePost();
  const { data: post } = getPostById(id as string);

  const isVisitorOwner = () => {
    if (post && post.author.username == session?.username) {
      return true;
    }
    return false;
  };

  return (
    <div>
      {post && (
        <>
          <h4>{post.title}</h4>
          <p>
            Author: {post.author.username}
            <img src={post.author.avatar} width={20} height={20} />
          </p>
          <p>{post.body}</p>

          {isVisitorOwner() && "Edit"}
        </>
      )}
    </div>
  );
}
