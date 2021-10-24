import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import FlatButton from "../../components/common/FlatButton";
import usePost from "../../lib/usePost";
import useSession from "../../lib/useSession";
import Image from "next/image";
import useGetPostById from "../../lib/useGetPostById";
import ErrorPage from "next/error";
import Layout from "../../components/Layout";
import { getPostById } from "../api/posts/[postId]";

export interface PostPageProps {
  post;
}

export default function PostPage({ post }: PostPageProps) {
  const { session } = useSession({ redirectTo: "/login" });

  // const router = useRouter();
  // const { id } = router.query;

  // const { post, error, isLoading } = useGetPostById(id as string);

  // if (error) {
  //   return <ErrorPage statusCode={error.status} />;
  // }

  const isVisitorOwner = () => {
    if (post && post.author.username == session?.username) {
      return true;
    }
    return false;
  };

  return (
    <Layout
      title={post?.title as string}
      description="Viewing post"
      // isLoading={isLoading}
    >
      {post && (
        <div className="p-8 bg-white dark:bg-gray-800 max-w-screen-lg m-auto">
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
          <Link href={`/user/${post.author.username}`} passHref>
            <div className="mb-12 text-xl font-normal text-gray-500 dark:text-gray-200 flex items-center cursor-pointer  w-max p-2">
              <Image
                src={post.author.avatar}
                width={30}
                height={30}
                alt="avatar"
              />
              {post.author.username}
            </div>
          </Link>
          <div
            className="custom-markdown-body"
            dangerouslySetInnerHTML={{ __html: post.body }}
          ></div>
        </div>
      )}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const res = await getPostById(context.params.id);

  return {
    props: { post: JSON.parse(JSON.stringify(res)) }, // will be passed to the page component as props
  };
}
