import { useEffect } from "react";
import Router from "next/router";
import { useSnapshot } from "valtio";
import { state, updateSession } from "../store/store";
import { Session } from "../domains/session";
import { useLocalStorage } from "./useLocalStorage";

export default function useSession({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  //   const { data: user, mutate: mutateUser } = useSWR("/api/user");
  const { session } = useSnapshot(state);
  const [name, setSession] = useLocalStorage<Session | undefined>(
    "session",
    undefined
  );

  useEffect(() => {
    if (name) {
      updateSession(name);
    }
  }, [name]);

  const mutateUser = (newSession: Session) => {
    updateSession(newSession);
    setSession(newSession);
  };

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !session) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !session) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && session)
    ) {
      Router.push(redirectTo);
    }
  }, [session, redirectIfFound, redirectTo]);

  return { session, mutateUser };
}
