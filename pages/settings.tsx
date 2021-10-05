import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import DropDownMenu from "../components/DropDownMenu";
import Layout from "../components/Layout";
import { useLocalStorage } from "../lib/useLocalStorage";

export interface SettingsProps {}

export type ThemeColours = "white" | "indigo";

export default function Settings({}: SettingsProps) {
  const [themeName, setPreferredTheme] = useLocalStorage<ThemeColours | null>(
    "preferredTheme",
    "white"
  );

  const [themeText, setThemeText] = useState("");

  useEffect(() => {
    if (themeName) {
      const classList = Array.from(document.documentElement.classList);
      document.documentElement.classList.remove(...classList);
      document.documentElement.classList.add(themeName);
      setThemeText(themeName);
    }
  }, [themeName]);

  return (
    <Layout title="Settings" description="Your settings">
      <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
        <h2 className="max-w-sm mx-auto md:w-1/3">Theme</h2>
        <div className="max-w-sm mx-auto md:w-2/3">
          <div className=" relative w-full">
            <DropDownMenu
              className="w-full"
              icon={
                <div className="relative">
                  <span className="pr-5">Theme selected: {themeText}</span>
                  <FontAwesomeIcon icon={faCaretDown} />
                </div>
              }
              items={[
                {
                  label: "White",
                  onClick: () => {
                    setPreferredTheme("white");
                  },
                },
                {
                  label: "Indigo",
                  onClick: () => {
                    setPreferredTheme("indigo");
                  },
                },
              ]}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
