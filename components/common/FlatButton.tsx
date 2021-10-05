import React from "react";

export interface FlatButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function FlatButton({
  children,
  className,
  ...props
}: FlatButtonProps) {
  return (
    <button
      className={`px-4 py-2 text-base border rounded-lg text-gray-700 bg-white hover:bg-gray-200 ${
        className ? className : ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
}
