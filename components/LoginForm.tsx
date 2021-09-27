import { Form, Formik } from "formik";
import React from "react";
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
        <TextInput
          label="Username"
          name="username"
          type="text"
          placeholder="Username"
        />
        <TextInput
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
        />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}
