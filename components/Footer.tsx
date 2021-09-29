import React from "react";

export interface FooterProps {}

export default function Footer({}: FooterProps) {
  return (
    <footer className="bg-white dark:bg-gray-800 w-full py-8 ">
      <div className="max-w-screen-xl mx-auto px-4">
        <ul className="max-w-screen-md mx-auto text-lg font-light flex flex-wrap justify-between">
          <li className="my-2">
            <a
              className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
              href="https://github.com/DarrenXu94"
            >
              Github
            </a>
          </li>
          <li className="my-2">
            <a
              className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
              href="https://www.linkedin.com/in/darren-xu-profile/"
            >
              LinkedIn
            </a>
          </li>

          <li className="my-2">
            <a
              className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
              href="https://darrenxu.com/"
            >
              Website
            </a>
          </li>

          <li className="my-2">
            <a
              className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
              href="https://blog.darrenxu.com/"
            >
              Blog
            </a>
          </li>
        </ul>

        <div className="text-center text-gray-500 dark:text-gray-200 pt-10 sm:pt-12 font-light flex items-center justify-center">
          Created by Darren Xu
        </div>
      </div>
    </footer>
  );
}
