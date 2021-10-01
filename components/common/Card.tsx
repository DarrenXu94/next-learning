import React from "react";
import { User } from "../../domains/user";
import Image from "next/image";

export interface CardProps {
  children;
  title: string;
  user?: User;
}

export default function Card({ children, title, user }: CardProps) {
  return (
    <div className="overflow-hidden shadow-lg rounded-lg h-90 cursor-pointer m-auto h-full">
      <div className="bg-white dark:bg-gray-800 w-full p-4 h-full flex flex-col justify-between">
        <div>
          <p className="text-indigo-500 text-md font-medium"></p>
          <p className="text-gray-800 dark:text-white text-xl font-medium mb-2">
            {title}
          </p>
          <p className="text-gray-400 dark:text-gray-300 font-light text-md break-all">
            {children}
          </p>
        </div>
        {user && (
          <div className="flex items-center mt-4 justify-between">
            <Image
              alt="profil"
              src={user.avatar}
              className="object-cover rounded-full h-10 w-10 "
            />
            <div className="flex flex-col justify-between ml-4 text-sm">
              <p className="text-gray-800 dark:text-white">{user.username}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
