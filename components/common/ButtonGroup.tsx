import React from "react";

export interface ButtonGroupProps {
  children;
}

export default function ButtonGroup({ children }: ButtonGroupProps) {
  return <div className="flex items-center">{children}</div>;
}

ButtonGroup.StartButton = function ({ children, className = "", ...props }) {
  return (
    <button
      key={props.name}
      className={`w-full border-l border-t border-b text-base font-medium rounded-l-md text-black bg-white hover:bg-gray-100 px-4 py-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

ButtonGroup.MiddleButton = function ({ children, className = "", ...props }) {
  return (
    <button
      key={props.name}
      className={`w-full border text-base font-medium text-black bg-white hover:bg-gray-100 px-4 py-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

ButtonGroup.EndButton = function ({ children, className = "", ...props }) {
  return (
    <button
      key={props.name}
      className={`w-full border-t border-b border-r text-base font-medium rounded-r-md text-black bg-white hover:bg-gray-100 px-4 py-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
