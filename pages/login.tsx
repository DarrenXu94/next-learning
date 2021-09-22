import React, { useState } from "react";
import Form from "../components/Form";
import RegisterForm from "../components/RegisterForm";
import useUser from "../lib/useUser";
import { auth, register } from "../services/auth";

export default function Login({}) {
  // Check if user is logged in, if they are redirect to profile page
  const { mutateUser } = useUser({
    redirectTo: "/profile",
    redirectIfFound: true,
  });
  const [formType, setFormType] = useState<"Login" | "Register">("Login");

  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (formType == "Login") {
      const target = event.currentTarget as typeof event.currentTarget & {
        username: { value: string };
        password: { value: string };
      };
      const res = await auth({
        username: target.username?.value,
        password: target.password?.value,
      });
      console.log({ res });
    } else {
      const target = event.currentTarget as typeof event.currentTarget & {
        username: { value: string };
        password: { value: string };
        email: { value: string };
      };
      const res = await register({
        username: target.username?.value,
        password: target.password?.value,
        email: target.email?.value,
      });
      console.log({ res });
    }

    // If success, set user with mutate, this will cause a redirect
  };

  return (
    <div className="login">
      {formType == "Login" ? (
        <Form errorMessage={errorMsg} onSubmit={handleSubmit} />
      ) : (
        <RegisterForm errorMessage={errorMsg} onSubmit={handleSubmit} />
      )}

      <button
        onClick={() => {
          setFormType(formType == "Login" ? "Register" : "Login");
        }}
      >
        {formType == "Login" ? "No account? Register" : "Login"}
      </button>
    </div>
  );
}
