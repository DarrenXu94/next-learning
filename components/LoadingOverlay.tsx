import React from "react";

export interface LoadingOverlayProps {}

export default function LoadingOverlay({}: LoadingOverlayProps) {
  return (
    <div className="absolute z-50 top-0 left-0 w-full">
      <div className="h-screen w-full z-10 inset-0 overflow-y-auto">
        <div className="absolute w-full h-full inset-0 bg-gray-500 opacity-75"></div>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          ></span>
          <div
            className="inline-block relative overflow-hidden transform transition-all sm:align-middle sm:max-w-lg"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div>
              <div className="rounded-lg p-8 bg-white shadow">
                <div className="bg-white dark:bg-gray-800 ">
                  <div className="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
                    <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
                      <span className="block">Loading documents</span>
                      <div className="flex justify-center pt-10">
                        <div
                          style={{ borderTopColor: "transparent" }}
                          className="w-16 h-16 border-4 border-primary border-solid rounded-full animate-spin"
                        ></div>
                      </div>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
