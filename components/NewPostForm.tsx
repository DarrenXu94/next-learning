import { Form, Formik, FormikProps } from "formik";
import React from "react";
import * as Yup from "yup";
import Button from "./common/Button";
import NavigationPrompt from "./common/NavigationPrompt";
import TipTap from "./common/TipTap";
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
        onSubmit({ title: values.title, body: values.body });
        setSubmitting(false);
      }}
      validationSchema={Yup.object({
        title: Yup.string().required("Required"),
        body: Yup.string().required("Required"),
      })}
    >
      {(props) => (
        <Form>
          <NavigationPrompt when={props.dirty} />

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

          <Button type="submit">Create</Button>
        </Form>
      )}
    </Formik>
  );
}
