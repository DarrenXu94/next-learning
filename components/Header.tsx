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
                <Link href="/profile-sg">
                  <a>
                    <img src={session.avatar} width={20} height={20} /> Profile
                    (Static Generation, recommended)
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/profile-ssr">
                  <a>Profile (Server-side Rendering)</a>
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
                {/* <a
                  href="/api/logout"
                  onClick={async (e) => {
                    e.preventDefault();
                    mutateUser(
                      await fetchJson("/api/logout", { method: "POST" }),
                      false,
                    );
                    router.push("/login");
                  }}
                >
                  Logout
                </a> */}
              </li>
            </>
          )}
          {/* <li>
            <a href="https://github.com/vvo/next-iron-session">
              <img src="/GitHub-Mark-Light-32px.png" width="32" height="32" />
            </a>
          </li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
