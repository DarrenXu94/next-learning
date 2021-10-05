import React, { useState } from "react";
import NewPostForm from "../components/NewPostForm";
import usePost from "../lib/usePost";
import toast from "react-hot-toast";
import Layout from "../components/Layout";

export interface createProps {}

export default function Create({}: createProps) {
  const [errorMsg, setErrorMsg] = useState("");

  const { createPost } = usePost();

  const handleSubmit = async ({ title, body }) => {
    try {
      console.log({ body });
      createPost({ title: title, body: body });
      toast.success("Successfully created post");
    } catch (e) {
      toast.error(e as string);
    }
  };

  return (
    <Layout title="Create new post" description="Create new post">
      <NewPostForm errorMessage={errorMsg} onSubmit={handleSubmit} />
    </Layout>
  );
}
