import React, { useEffect, useState } from "react";
import Button from "../components/common/Button";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { Session } from "../domains/session";
import { HTTPResponse } from "../interfaces/HTTP";
import useSession from "../lib/useSession";
import { auth, register } from "../services/auth";
import { getFollowersOfUserAPI, getUserFollowingAPI } from "../services/follow";

export default function Login({}) {
  // Check if user is logged in, if they are redirect to profile page
  const { mutateUser } = useSession({
    redirectTo: "/profile",
    redirectIfFound: true,
  });
  const [formType, setFormType] = useState<"Login" | "Register">("Login");

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setErrorMsg("");
  }, [formType]);

  const handleError = (response: HTTPResponse) => {
    if (response.status !== 200) {
      // Do notification

      throw response.body.join(" ");
    }
    if (!response.body) {
      throw "Incorrect credentials";
    }
  };

  const handleResponse = async (res) => {
    try {
      handleError(res);
      // Also get following and followers here
      const followers = await getFollowersOfUserAPI({
        username: res.body.username,
      });
      const following = await getUserFollowingAPI({
        username: res.body.username,
      });

      const newSession: Session = {
        ...res.body,
        following: following.body,
        followers: followers.body,
      };
      mutateUser(newSession);
    } catch (e) {
      console.log(e);
      setErrorMsg(e as string);
    }
    // If success, set user with mutate, this will cause a redirect
  };

  const handleLoginSubmit = async ({ username, password }) => {
    let res = await auth({
      username: username,
      password: password,
    });

    handleResponse(res);
  };

  const handleRegisterSubmit = async ({ username, password, email }) => {
    let res = await register({
      username: username,
      password: password,
      email: email,
    });
    handleResponse(res);
  };

  return (
    <div className="login">
      {errorMsg && <p className="error">{errorMsg}</p>}
      {formType == "Login" ? (
        <LoginForm errorMessage={errorMsg} onSubmit={handleLoginSubmit} />
      ) : (
        <RegisterForm errorMessage={errorMsg} onSubmit={handleRegisterSubmit} />
      )}
      <Button
        green
        onClick={() => {
          setFormType(formType == "Login" ? "Register" : "Login");
        }}
      >
        {" "}
        {formType == "Login" ? "No account? Register" : "Login"}
      </Button>
    </div>
  );
}
