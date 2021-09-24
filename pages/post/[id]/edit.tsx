import { useRouter } from "next/router";
import React from "react";
import DeleteButton from "../../../components/DeleteButton";
import usePost from "../../../lib/usePost";

export interface EditPageProps {}

export default function EditPage({}: EditPageProps) {
  const router = useRouter();
  const { id } = router.query;
  const { getPostById } = usePost();
  const { data: post } = getPostById(id as string);
  return (
    <div>
      <DeleteButton id={id as string} />
      <h4>Edit</h4>
      {post && (
        <>
          <h4>{post.title}</h4>

          <p>{post.body}</p>
        </>
      )}
    </div>
  );
}
