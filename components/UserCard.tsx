import React from "react";
import { User } from "../domains/user";
import Image from "next/image";

export interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="shadow-lg rounded-2xl bg-white dark:bg-gray-800 p-4 hover:-translate-y-1 transition duration-500 ease-in-out transform ">
      <div className="flex-row gap-4 flex justify-center items-center">
        <div className="flex-shrink-0">
          <Image
            width={"64px"}
            height={"64px"}
            alt="profile"
            src={user.avatar}
            className="mx-auto object-cover rounded-full h-16 w-16 "
          />
        </div>
        <div className=" flex flex-col">
          <span className="text-gray-600 dark:text-white text-lg font-medium">
            {user.username}
          </span>
          <span className="text-gray-400 text-xs">{user.email}</span>
        </div>
      </div>
    </div>
  );
}
