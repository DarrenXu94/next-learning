import { Form, Formik } from "formik";
import React, { useCallback, useState } from "react";
import { useSnapshot } from "valtio";
import * as Yup from "yup";
import useUpload from "../lib/useUpload";
import { resetImages, state } from "../store/store";
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
  const [preventPrompt, setpreventPrompt] = useState(false);

  const { imageUrls } = useSnapshot(state);

  const { deleteImage } = useUpload();

  const onConfirm = useCallback(async () => {
    if (imageUrls) {
      console.log(imageUrls, "from callback");
      await deleteImage(imageUrls);
      resetImages();
    }
  }, [imageUrls]);

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
          <NavigationPrompt
            when={props.dirty && !preventPrompt}
            onConfirm={onConfirm}
          />
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

          <Button onClick={() => setpreventPrompt(true)} type="submit">
            Create
          </Button>
        </Form>
      )}
    </Formik>
  );
}
