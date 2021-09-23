import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { Session } from "../domains/session";
import { HTTPResponse } from "../interfaces/HTTP";
import useSession from "../lib/useSession";
import { auth, register } from "../services/auth";

export default function Login({}) {
  // Check if user is logged in, if they are redirect to profile page
  const { mutateUser } = useSession({
    redirectTo: "/profile",
    redirectIfFound: true,
  });
  const [formType, setFormType] = useState<"Login" | "Register">("Login");

  const [errorMsg, setErrorMsg] = useState("");

  const handleError = (response: HTTPResponse) => {
    if (response.status !== 200) {
      // Do notification
      console.log(response.body);
      setErrorMsg(response.body.join(" "));
      throw response.statusText;
    }
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    let res;

    if (formType == "Login") {
      const target = event.currentTarget as typeof event.currentTarget & {
        username: { value: string };
        password: { value: string };
      };
      res = await auth({
        username: target.username?.value,
        password: target.password?.value,
      });
    } else {
      const target = event.currentTarget as typeof event.currentTarget & {
        username: { value: string };
        password: { value: string };
        email: { value: string };
      };
      res = await register({
        username: target.username?.value,
        password: target.password?.value,
        email: target.email?.value,
      });
    }
    console.log({ res });
    try {
      handleError(res);

      mutateUser(res.body as Session);
    } catch (e) {
      console.log(e);
    }

    // If success, set user with mutate, this will cause a redirect
  };

  return (
    <div className="login">
      {formType == "Login" ? (
        <LoginForm errorMessage={errorMsg} onSubmit={handleSubmit} />
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
