import React, { useState } from "react";
import toast from "react-hot-toast";
import Layout from "../components/Layout";
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
    redirectTo: "/feed",
    redirectIfFound: true,
  });
  const [formType, setFormType] = useState<"Login" | "Register">("Login");

  const handleError = (response: HTTPResponse) => {
    if (response.status !== 200) {
      // Do notification

      throw response.body;
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
      toast.error(e as string);
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
    <Layout title="Login" description="Login">
      <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 mx-auto">
        <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
          Login To Your Account
        </div>
        {formType == "Login" ? (
          <LoginForm onSubmit={handleLoginSubmit} />
        ) : (
          <RegisterForm onSubmit={handleRegisterSubmit} />
        )}

        <div className="flex items-center mb-6 -mt-4">
          <div className="flex ml-auto">
            <a
              href="#"
              className="inline-flex text-xs font-thin text-gray-500 sm:text-sm dark:text-gray-100 hover:text-gray-700 dark:hover:text-white"
            >
              Forgot Your Password?
            </a>
          </div>
        </div>

        {formType == "Login" ? (
          <RegisterButton setFormType={setFormType} />
        ) : (
          <SignInButton setFormType={setFormType} />
        )}
      </div>
    </Layout>
  );
}

const RegisterButton = ({ setFormType }) => {
  return (
    <div className="flex items-center justify-center mt-6 cursor-pointer">
      <a
        onClick={() => {
          setFormType("Register");
        }}
        className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white"
      >
        <span className="ml-2">You don&#x27;t have an account?</span>
      </a>
    </div>
  );
};

const SignInButton = ({ setFormType }) => {
  return (
    <span className="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400">
      Already have an account?{" "}
      <a
        onClick={() => {
          setFormType("Login");
        }}
        className="text-sm text-blue-500 underline hover:text-blue-700 cursor-pointer"
      >
        Sign in
      </a>
    </span>
  );
};
