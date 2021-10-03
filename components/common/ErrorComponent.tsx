import React from "react";

export interface ErrorComponentProps {}

export default function ErrorComponent({}: ErrorComponentProps) {
  return (
    <div className="bg-white dark:bg-gray-800 ">
      <div className="lg:flex lg:items-center lg:justify-between w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
        <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
          <span className="block">Server error</span>
          <span className="block text-indigo-500">
            Thank you for your patience while we work on the issue
          </span>
        </h2>
      </div>
    </div>
  );
}
