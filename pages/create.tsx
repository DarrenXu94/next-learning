import React, { useState } from "react";
import NewPostForm from "../components/NewPostForm";
import usePost from "../lib/usePost";

export interface createProps {}

export default function create({}: createProps) {
  const [errorMsg, setErrorMsg] = useState("");

  const { createPost } = usePost();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.currentTarget as typeof event.currentTarget & {
      title: { value: string };
      body: { value: string };
    };
    createPost({ title: target.title.value, body: target.body.value });
  };

  return (
    <div>
      <NewPostForm errorMessage={errorMsg} onSubmit={handleSubmit} />
    </div>
  );
}
