import Link from "next/link";
import React from "react";
import UserCard from "../../components/UserCard";
import useUser from "../../lib/useUser";

export interface UserIndexProps {}

export default function UserIndex({}: UserIndexProps) {
  const { getAllUsers } = useUser();

  const { data: users } = getAllUsers();

  return (
    <div className="container flex flex-row mx-auto w-full items-center justify-center flex-wrap max-w-screen-lg">
      {" "}
      {users &&
        users.map((user) => {
          return (
            <div key={user._id} className="mr-2 mb-2">
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
