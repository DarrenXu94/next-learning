import { Formik, Form } from "formik";
import React from "react";
import Button from "./common/Button";
import TipTap from "./common/TipTap";
import TextAreaInput from "./form/TextAreaInput";
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
        console.log({ values });
        // onSubmit({ title: values.title, body: values.body });
        // setSubmitting(false);
      }}
    >
      <Form>
        <div className="flex flex-col mb-2">
          <TextInput
            label="Title"
            name="title"
            type="text"
            placeholder="Title"
          />
        </div>
        <div className="flex flex-col mb-2">
          {/* <TextAreaInput
            label="Body"
            name="body"
            type="text"
            placeholder="Body"
            rows={10}
          /> */}
          <TipTap label="Body" name="body" type="text" placeholder="Body" />
        </div>

        <Button type="submit">Create</Button>
      </Form>
    </Formik>
  );
}
