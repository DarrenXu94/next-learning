import { Form, Formik } from "formik";
import React from "react";
import Button from "./common/Button";
import TextInput from "./form/TextInput";

export interface LoginFormProps {
  onSubmit: ({ username, password }) => void;
  errorMessage: string;
}

export default function LoginForm({ onSubmit, errorMessage }: LoginFormProps) {
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit({ username: values.username, password: values.password });
        setSubmitting(false);
      }}
    >
      <Form>
        <div className="flex flex-col mb-2">
          <TextInput
            label="Username"
            name="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="flex flex-col mb-2">
          <TextInput
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="flex w-full my-4">
          <Button type="submit">Submit</Button>
        </div>
      </Form>
    </Formik>
  );
}
