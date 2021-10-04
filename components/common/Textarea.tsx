import React from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

interface IStyle {}

export default function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={`flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
        className ? className : ""
      }`}
      {...props}
    />
  );
}
