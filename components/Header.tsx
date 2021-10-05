import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSession from "../lib/useSession";
import Link from "./common/Link";
import DropDownMenu from "./DropDownMenu";
import SearchForm from "./SearchForm";

const UserSection = () => {
  const { session, logout } = useSession();

  const router = useRouter();

  const logoutFunction = () => {
    logout();
    router.push("/login");
  };

  if (!session) {
    return <Link href="/login">Login</Link>;
  } else {
    return (
      <DropDownMenu
        icon={
          <div className="relative">
            <Image
              width={"40px"}
              height={"40px"}
              alt="profile"
              src={session.avatar}
              className="mx-auto object-cover rounded-full h-10 w-10 "
            />
          </div>
        }
        items={[
          {
            label: <b className="text-lg">{session.username}</b>,
            link: "/profile",
          },
          {
            label: "Settings",
            link: "/settings",
          },
          { link: "/login", label: "Logout", onClick: logoutFunction },
        ]}
      />
    );
  }
};

const DesktopLink = ({ children, href }) => {
  return (
    <Link
      href={href}
      className="cursor-pointer text-gray-300 hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
    >
      {children}
    </Link>
  );
};

const MobileLink = ({ children, href }) => {
  return (
    <Link
      href={href}
      className="cursor-pointer text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
    >
      {children}
    </Link>
  );
};

const sections = [
  {
    href: "/feed",
    label: "Home",
  },
  {
    href: "/",
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
      <nav className="bg-white dark:bg-gray-800 shadow absolute w-full z-20 py-2">
        <div className="max-w-7xl mx-auto px-2 md:px-8">
          <div className="flex items-center justify-between h-16 ">
            <div className=" flex items-center w-full">
              <Link
                href={session ? "/feed" : "/"}
                className="flex-shrink-0 relative"
              >
                <Image
                  width={"32px"}
                  height={"32px"}
                  className="h-8 w-8"
                  src="/icon.png"
                  alt="Workflow"
                />
              </Link>
              {session && (
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {sections.map((section) => {
                      return (
                        <DesktopLink href={section.href} key={section.href}>
                          {section.label}
                        </DesktopLink>
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
                  <MobileLink key={section.href} href={section.href}>
                    {section.label}
                  </MobileLink>
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
