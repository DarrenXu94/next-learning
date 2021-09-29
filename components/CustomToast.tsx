import React from "react";
import toast, { Toast, Toaster } from "react-hot-toast";

export interface CustomToastProps {}

export default function CustomToast({}: CustomToastProps) {
  const renderType = (t: Toast) => {
    switch (t.type) {
      case "success": {
        return <Success message={t.message} />;
      }
      case "error": {
        return <Danger message={t.message} />;
      }

      case "loading": {
        return <Alert message={t.message} />;
      }
      default: {
        return <Alert message={t.message} />;
      }
    }
  };
  return (
    <Toaster position="top-right">
      {(t) => {
        return (
          <div className={`${t.visible ? "animate-enter" : "animate-leave"} `}>
            {renderType(t)}
          </div>
        );
      }}
    </Toaster>
  );
}

const Success = ({ message }) => {
  return (
    <div
      className="bg-green-200 border-green-600 text-green-600 border-l-4 p-4 "
      role="alert"
    >
      <p className="font-bold">Success</p>
      <p>{message}</p>
    </div>
  );
};

const Alert = ({ message }) => {
  return (
    <div
      className="bg-red-200 border-red-600 text-red-600 border-l-4 p-4"
      role="alert"
    >
      <p className="font-bold">Be Warned</p>
      <p>{message}</p>
    </div>
  );
};

const Danger = ({ message }) => {
  return (
    <div
      className="bg-yellow-200 border-yellow-600 text-yellow-600 border-l-4 p-4"
      role="alert"
    >
      <p className="font-bold">Danger</p>
      <p>
        <p>{message}</p>
      </p>
    </div>
  );
};
