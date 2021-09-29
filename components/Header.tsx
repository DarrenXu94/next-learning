import React, { useState } from "react";
import Link from "next/link";
import useSession from "../lib/useSession";
import { useRouter } from "next/router";
import Button from "./common/Button";
import tw, { css, styled } from "twin.macro";
import SearchForm from "./SearchForm";

const UserSection = () => {
  const { session, logout } = useSession();

  const router = useRouter();

  if (!session) {
    return (
      <Link href="/login">
        <a>Login</a>
      </Link>
    );
  } else {
    return (
      <>
        <Link href="/profile">
          <a href="#" className="flex items-center relative pr-3">
            <span className="text-2xl pr-3">{session.username}</span>
            <img
              alt="profil"
              src={session.avatar}
              className="mx-auto object-cover rounded-full h-10 w-10 "
            />
          </a>
        </Link>

        <Button
          onClick={() => {
            logout();
            router.push("/login");
          }}
        >
          Logout
        </Button>
      </>
    );
  }
};

const DesktopLink = styled.a((props) => [
  tw`cursor-pointer text-gray-300 hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium`,
]);

const MobileLink = styled.a((props) => [
  tw`cursor-pointer text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium`,
]);

const sections = [
  {
    href: "/feed",
    label: "Home",
  },
  {
    href: "/post",
    label: "Posts",
  },
  {
    href: "/user",
    label: "Users",
  },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { session, logout } = useSession();

  return (
    <div>
      <nav className="bg-white dark:bg-gray-800 shadow absolute w-full z-10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-16 ">
            <div className=" flex items-center w-full">
              <Link href={session ? "/feed" : "/"}>
                <a className="flex-shrink-0" href="/">
                  <img
                    className="h-8 w-8"
                    src="https://avatars.dicebear.com/api/identicon/test.svg "
                    alt="Workflow"
                  />
                </a>
              </Link>
              {session && (
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {sections.map((section) => {
                      return (
                        <Link key={section.href} href={section.href}>
                          <DesktopLink>{section.label}</DesktopLink>
                        </Link>
                      );
                    })}

                    <SearchForm />
                  </div>
                </div>
              )}

              <div className="hidden md:flex ml-auto relative p-1 items-center justify-end w-1/4 ml-5 mr-4 sm:mr-0 sm:right-auto">
                <UserSection />
              </div>
            </div>
            <div className="block">
              <div className="ml-4 flex items-center md:ml-6"></div>
            </div>
            {session && (
              <div className="-mr-2 flex md:hidden">
                <button
                  className="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="h-8 w-8"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {session && (
          <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {sections.map((section) => {
                return (
                  <Link key={section.href} href={section.href}>
                    <MobileLink>{section.label}</MobileLink>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
