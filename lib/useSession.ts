import { useEffect, useState } from "react";
import Router from "next/router";
import { useSnapshot } from "valtio";
import { state, updateSession } from "../store/store";
import { Session } from "../domains/session";
import { useLocalStorage } from "./useLocalStorage";

export default function useSession({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  const { session } = useSnapshot(state);
  const [name, setSession] = useLocalStorage<Session | null>("session", null);
  const [noSession, setNoSession] = useState(false);

  useEffect(() => {
    if (name) {
      updateSession(name);
      setNoSession(false);
    } else {
      setNoSession(true);
    }
  }, [name]);

  const mutateUser = (newSession: Session) => {
    updateSession(newSession);
    setSession(newSession);
  };

  const logout = () => {
    updateSession(undefined);
    // setSession(undefined);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("session");
    }
  };

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && noSession) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && session)
    ) {
      Router.push(redirectTo);
    }
  }, [session, redirectIfFound, redirectTo, noSession]);

  return { session, mutateUser, logout };
}
