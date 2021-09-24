import React from "react";
import Link from "next/link";
import useSession from "../lib/useSession";
import { useRouter } from "next/router";
// import fetchJson from "../lib/fetchJson";

const Header = () => {
  const { session, logout } = useSession();
  const router = useRouter();
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          {!session && (
            <li>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </li>
          )}
          {session && (
            <>
              <li>
                <Link href="/profile">
                  <a>
                    <img src={session.avatar} width={20} height={20} /> Profile{" "}
                    {session.username}
                  </a>
                </Link>
              </li>

              <li>
                <a
                  href="/api/logout"
                  onClick={async (e) => {
                    e.preventDefault();
                    logout();
                    router.push("/login");
                  }}
                >
                  Logout
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
