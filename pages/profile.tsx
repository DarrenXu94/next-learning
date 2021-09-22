import React from "react";
import useSession from "../lib/useSession";

export interface profileProps {}

export default function profile({}: profileProps) {
  const { session } = useSession({ redirectTo: "/login" });

  if (!session) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h1>This is your profile</h1>
    </div>
  );
}
