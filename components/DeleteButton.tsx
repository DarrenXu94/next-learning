import React from "react";
import usePost from "../lib/usePost";
import Router from "next/router";

export interface DeleteButtonProps {
  id: string;
}

export default function DeleteButton({ id }: DeleteButtonProps) {
  const { deletePostById } = usePost();

  const handleClick = async () => {
    const res = await deletePostById(id);
    if (res) {
      Router.push(`/post`);
    }
  };
  return (
    <div>
      <button onClick={handleClick}>Delete this post</button>
    </div>
  );
}
