import { Formik, Form } from "formik";
import React from "react";
import TextInput from "./form/TextInput";
import * as Yup from "yup";

export interface RegisterFormProps {
  onSubmit: ({ username, password, email }) => void;
  errorMessage: string;
}

export default function RegisterForm({
  onSubmit,
  errorMessage,
}: RegisterFormProps) {
  return (
    <Formik
      initialValues={{ username: "", password: "", email: "" }}
      validationSchema={Yup.object({
        username: Yup.string()
          .min(3, "Must be 3 characters or more")
          .required("Required"),
        email: Yup.string()
          .email("Please enter a valid email")
          .required("Required"),
        password: Yup.string()
          .min(12, "Must be 12 characters or more")
          .required("Required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit({
          username: values.username,
          password: values.password,
          email: values.email,
        });
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
          label="Email"
          name="email"
          type="text"
          placeholder="Enter your email"
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
