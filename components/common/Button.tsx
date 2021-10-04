import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <>
      <button
        className={`indigo py-2 px-4 bg-primary hover:bg-secondary focus:ring-primary focus:ring-offset-primary text-primary transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg 
  ${className ? className : ""} `}
        {...props}
      >
        {children}
      </button>
    </>
  );
};

export default Button;

// bg-indigo-600 hover:bg-indigo-700
