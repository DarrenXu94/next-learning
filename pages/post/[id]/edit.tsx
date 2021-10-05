import { useRouter } from "next/router";
import React from "react";
import DeleteButton from "../../../components/DeleteButton";
import EditPostForm from "../../../components/EditPostForm";
import usePost from "../../../lib/usePost";
import Router from "next/router";
import toast from "react-hot-toast";
import useGetPostById from "../../../lib/useGetPostById";
import ErrorPage from "next/error";
import Layout from "../../../components/Layout";

export interface EditPageProps {}

export default function EditPage({}: EditPageProps) {
  const router = useRouter();
  const { id } = router.query;
  const { post, error } = useGetPostById(id as string);

  const { updatePost } = usePost();
  const handleSubmit = async ({ title, body }) => {
    try {
      const res = await updatePost({ title, body, id });
      if (res) {
        Router.push(`/post/${id}`);
      }
      toast.success("Successfully updated post");
    } catch (e) {
      toast.error(e as string);
    }
  };

  if (error) {
    return <ErrorPage statusCode={error.status} />;
  }

  return (
    <Layout
      title={`Edit - ${post?.title as string}`}
      description="Viewing post"
    >
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Update {post?.title}
        </h1>
        <DeleteButton id={id as string} />
      </div>
      {post && (
        <>
          <EditPostForm
            onCancel={() => {
              Router.push(`/post/${id}`);
            }}
            body={post.body}
            title={post.title}
            onSubmit={handleSubmit}
          />
        </>
      )}
    </Layout>
  );
}
