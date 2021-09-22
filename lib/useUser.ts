import { useEffect } from "react";
import Router from "next/router";
import { useSnapshot } from "valtio";
import { state, updateUser } from "../store/store";
import { User } from "../domains/user";

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  //   const { data: user, mutate: mutateUser } = useSWR("/api/user");
  const { user } = useSnapshot(state);

  const mutateUser = (newUser: User) => {
    updateUser(newUser);
  };

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, mutateUser };
}
