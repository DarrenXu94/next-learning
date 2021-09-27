import React, { useState } from "react";
import NewPostForm from "../components/NewPostForm";
import usePost from "../lib/usePost";

export interface createProps {}

export default function create({}: createProps) {
  const [errorMsg, setErrorMsg] = useState("");

  const { createPost } = usePost();

  const handleSubmit = async ({ title, body }) => {
    createPost({ title: title, body: body });
  };

  return (
    <div>
      <NewPostForm errorMessage={errorMsg} onSubmit={handleSubmit} />
    </div>
  );
}
