import React from "react";
import usePost from "../lib/usePost";
import Router from "next/router";
import FlatButton from "./common/FlatButton";

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
  return <FlatButton onClick={handleClick}>Delete this post</FlatButton>;
}
