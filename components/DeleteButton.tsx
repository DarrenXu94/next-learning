import React from "react";
import usePost from "../lib/usePost";
import Router from "next/router";
import FlatButton from "./common/FlatButton";
import toast from "react-hot-toast";

export interface DeleteButtonProps {
  id: string;
}

export default function DeleteButton({ id }: DeleteButtonProps) {
  const { deletePostById } = usePost();

  const handleClick = async () => {
    try {
      const res = await deletePostById(id);
      if (res) {
        Router.push(`/feed`);
      }
      toast.success("Successfully deleted post");
    } catch (e) {
      toast.error(e as string);
    }
  };
  return <FlatButton onClick={handleClick}>Delete this post</FlatButton>;
}
