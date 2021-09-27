import { Formik, Form } from "formik";
import React from "react";
import TextInput from "./form/TextInput";

export interface RegisterFormProps {
  onSubmit: ({ username, password, email }) => void;
  errorMessage: string;
}

export default function RegisterForm({
  onSubmit,
  errorMessage,
}: RegisterFormProps) {
  return (
    // <form onSubmit={onSubmit}>
    //   <label>
    //     Username
    //     <input type="text" name="username" required />
    //     Email
    //     <input type="text" name="email" required />
    //     Password
    //     <input type="text" name="password" required />
    //   </label>

    //   <button type="submit">Register</button>

    //   {errorMessage && <p className="error">{errorMessage}</p>}
    // </form>
    <Formik
      initialValues={{ username: "", password: "", email: "" }}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit({
          username: values.username,
          password: values.password,
          email: values.email,
        });
        // setTimeout(() => {
        setSubmitting(false);
        // }, 400);
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
