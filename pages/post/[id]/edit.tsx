import { useRouter } from "next/router";
import React from "react";
import DeleteButton from "../../../components/DeleteButton";
import EditPostForm from "../../../components/EditPostForm";
import usePost from "../../../lib/usePost";
import Router from "next/router";
import toast from "react-hot-toast";

export interface EditPageProps {}

export default function EditPage({}: EditPageProps) {
  const router = useRouter();
  const { id } = router.query;
  const { getPostById, updatePost } = usePost();
  const { data: post } = getPostById(id as string);
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
  return (
    <div className="flex flex-col max-w-screen-lg	 w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 mx-auto">
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
    </div>
  );
}
