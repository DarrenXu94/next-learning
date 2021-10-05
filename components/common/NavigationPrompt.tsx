import React, { useEffect } from "react";
import SingletonRouter, { Router, useRouter } from "next/router";
export interface NavigationPromptProps {
  when: boolean;
}

export default function NavigationPrompt({ when }: NavigationPromptProps) {
  const router = useRouter();

  useEffect(() => {
    const warningText =
      "You have unsaved changes - are you sure you wish to leave this page?";
    const handleWindowClose = (e: BeforeUnloadEvent) => {
      if (!when) return;
      e.preventDefault();
      return (e.returnValue = warningText);
    };
    const handleBrowseAway = () => {
      if (!when) return;
      if (window.confirm(warningText)) return;
      router.events.emit("routeChangeError");
      throw "routeChange aborted.";
    };
    window.addEventListener("beforeunload", handleWindowClose);
    router.events.on("routeChangeStart", handleBrowseAway);
    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
      router.events.off("routeChangeStart", handleBrowseAway);
    };
  }, [when]);

  return null;
}
