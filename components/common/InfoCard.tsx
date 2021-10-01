import React from "react";

export interface InfoCardProps {
  heading: string;
  content: string;
}

export default function InfoCard({ heading, content }: InfoCardProps) {
  return (
    <div className="shadow-lg rounded-2xl w-36 p-4 bg-white dark:bg-gray-800 w-full md:w-auto mb-5">
      <div className="flex items-center justify-center">
        <p className="text-md text-gray-700 dark:text-gray-50 ml-2 text-center">
          {heading}
        </p>
      </div>
      <div className="flex flex-col justify-start">
        <p className="text-gray-800 text-3xl text-center dark:text-white font-bold my-2">
          {content}
        </p>
      </div>
    </div>
  );
}
