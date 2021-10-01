import Link from "next/link";
import React from "react";
import UserCard from "../../components/UserCard";
import useAllUsers from "../../lib/useAllUsers";
import useUser from "../../lib/useUser";

export interface UserIndexProps {}

export default function UserIndex({}: UserIndexProps) {
  const { users } = useAllUsers();

  return (
    <div className="container grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full items-center justify-center flex-wrap max-w-screen-lg m-auto">
      {" "}
      {users &&
        users.map((user) => {
          return (
            <div key={user._id}>
              <Link href={`/user/${user.username}`}>
                <a>
                  <UserCard user={user} />
                </a>
              </Link>
            </div>
          );
        })}
    </div>
  );
}
