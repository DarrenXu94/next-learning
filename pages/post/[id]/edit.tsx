import { useRouter } from "next/router";
import React from "react";
import DeleteButton from "../../../components/DeleteButton";
import EditPostForm from "../../../components/EditPostForm";
import usePost from "../../../lib/usePost";
import Router from "next/router";

export interface EditPageProps {}

export default function EditPage({}: EditPageProps) {
  const router = useRouter();
  const { id } = router.query;
  const { getPostById, updatePost } = usePost();
  const { data: post } = getPostById(id as string);
  const handleSubmit = async ({ title, body }) => {
    const res = await updatePost({ title, body, id });
    if (res) {
      Router.push(`/post/${id}`);
    }
  };
  return (
    <div>
      <DeleteButton id={id as string} />
      <h4>Edit</h4>
      {post && (
        <>
          <EditPostForm
            body={post.body}
            title={post.title}
            onSubmit={handleSubmit}
          />
        </>
      )}
    </div>
  );
}
