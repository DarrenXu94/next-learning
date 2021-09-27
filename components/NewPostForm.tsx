import { Formik, Form } from "formik";
import React from "react";
import TextInput from "./form/TextInput";

export interface NewPostFormProps {
  onSubmit: ({ title, body }) => void;
  errorMessage: string;
}

export default function NewPostForm({
  onSubmit,
  errorMessage,
}: NewPostFormProps) {
  return (
    <Formik
      initialValues={{ title: "", body: "" }}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit({ title: values.title, body: values.body });
        setSubmitting(false);
      }}
    >
      <Form>
        <TextInput label="Title" name="title" type="text" placeholder="Title" />
        <TextInput label="Body" name="body" type="text" placeholder="Body" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}
