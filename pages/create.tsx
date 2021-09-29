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
    <div className="flex flex-col max-w-screen-lg	 w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 mx-auto">
      <NewPostForm errorMessage={errorMsg} onSubmit={handleSubmit} />
    </div>
  );
}
