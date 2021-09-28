import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import FlatButton from "../../components/common/FlatButton";
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
        // <>
        //   <h4>{post.title}</h4>
        //   <p>
        //     Author: {post.author.username}
        //     <img src={post.author.avatar} width={20} height={20} />
        //   </p>
        //   <p>{post.body}</p>

        //   {isVisitorOwner() && (
        //     <Link href={`/post/${post._id}/edit`}>
        //       <a>Edit this post</a>
        //     </Link>
        //   )}
        // </>
        <div className="p-8 bg-white dark:bg-gray-800 rounded-lg max-w-screen-lg m-auto shadow">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              {post.title}
            </h1>
            {isVisitorOwner() && (
              <Link href={`/post/${post._id}/edit`}>
                <a>
                  <FlatButton>Edit this post</FlatButton>
                </a>
              </Link>
            )}
          </div>
          <div className="mb-12 text-xl font-normal text-gray-500 dark:text-gray-200 flex items-center">
            <img src={post.author.avatar} width={30} height={30} />
            {post.author.username}
          </div>
          <p>{post.body}</p>
        </div>
      )}
    </div>
  );
}
