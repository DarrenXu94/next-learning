import { Formik, Form } from "formik";
import React from "react";
import Button from "./common/Button";
import TipTap from "./common/TipTap";
import TextAreaInput from "./form/TextAreaInput";
import TextInput from "./form/TextInput";

export interface EditPostFormProps {
  title: string;
  body: string;
  onSubmit: ({ title, body }) => void;
  onCancel: () => void;
}

export default function EditPostForm({
  title,
  body,
  onSubmit,
  onCancel,
}: EditPostFormProps) {
  return (
    <>
      <Formik
        initialValues={{ title, body }}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit({ title: values.title, body: values.body });
          setSubmitting(false);
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
            <TipTap label="Body" name="body" type="text" placeholder="Body" />
          </div>

          <Button type="submit">Update</Button>
          <Button green type="button" onClick={onCancel}>
            Cancel
          </Button>
        </Form>
      </Formik>
    </>
  );
}
