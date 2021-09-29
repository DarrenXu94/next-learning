import Link from "next/link";
import React from "react";
import { User } from "../domains/user";
import UserCard from "./UserCard";

export interface UserRollProps {
  users: User[] | undefined;
  title: string;
}

export default function UserRoll({ users, title }: UserRollProps) {
  return (
    <>
      <div className="header flex items-end justify-between mb-12 flex-col md:flex-row mt-10">
        <div className="title">
          <p className="text-4xl font-bold text-gray-800 mb-4">{title}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-12">
        {users &&
          users.map((user) => {
            return (
              <div key={user.username} className="mr-2 mb-2">
                <Link href={`/user/${user.username}`}>
                  <a>
                    <UserCard user={user} />
                  </a>
                </Link>
              </div>
            );
          })}
      </div>
    </>
  );
}
