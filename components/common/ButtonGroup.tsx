import React from "react";

export interface ButtonGroupProps {
  children;
}

export default function ButtonGroup({ children }: ButtonGroupProps) {
  return <div className="flex items-center flex-wrap">{children}</div>;
}

ButtonGroup.StartButton = function StartButton({
  children,
  className = "",
  ...props
}) {
  return (
    <button
      key={props.name}
      className={`mb-2 w-full border-l border-t border-b text-base font-medium rounded-l-md text-black bg-white hover:bg-gray-100 px-4 py-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

ButtonGroup.MiddleButton = function MiddleButton({
  children,
  className = "",
  ...props
}) {
  return (
    <button
      key={props.name}
      className={`mb-2 w-full border text-base font-medium text-black bg-white hover:bg-gray-100 px-4 py-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

ButtonGroup.EndButton = function EndButton({
  children,
  className = "",
  ...props
}) {
  return (
    <button
      key={props.name}
      className={`mb-2 mr-2 w-full border text-base font-medium rounded-r-md text-black bg-white hover:bg-gray-100 px-4 py-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

ButtonGroup.SoloButton = function SoloButton({
  children,
  className = "",
  ...props
}) {
  return (
    <button
      key={props.name}
      className={`mb-2 mx-2 w-full border text-base font-medium rounded-r-md rounded-l-md text-black bg-white hover:bg-gray-100 px-4 py-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
