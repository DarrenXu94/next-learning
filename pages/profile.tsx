import React from "react";
import useUser from "../lib/useUser";

export interface profileProps {}

export default function profile({}: profileProps) {
  const { user } = useUser({ redirectTo: "/login" });

  if (!user) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h1>This is your profile</h1>
    </div>
  );
}
