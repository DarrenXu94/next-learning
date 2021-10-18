import "../styles/TipTap.scss";
import "../styles/globals.scss";
import "../styles/application.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import React, { useEffect } from "react";
import Header from "../components/Header";
import { ReactQueryDevtools } from "react-query/devtools";
// import "tailwindcss/tailwind.css";
import Footer from "../components/Footer";
import CustomToast from "../components/CustomToast";
import { AnimatePresence } from "framer-motion";
import { useLocalStorage } from "../lib/useLocalStorage";
import { ThemeColours } from "./settings";
const twentyFourHoursInMs = 1000 * 60 * 60 * 24;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: twentyFourHoursInMs,
      cacheTime: 60 * 1000 * 10,
      retry: false,
    },
  },
});

function MyApp({ Component, pageProps, router }: AppProps) {
  const [themeName, _] = useLocalStorage<ThemeColours | null>(
    "preferredTheme",
    "white"
  );

  useEffect(() => {
    if (themeName) {
      const classList = Array.from(document.documentElement.classList);
      document.documentElement.classList.remove(...classList);
      document.documentElement.classList.add(themeName);
    }
  }, [themeName]);

  return (
    <>
      <CustomToast />
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={true} /> */}

        <Header />
        <div className="bg-gray-100 flex flex-col min-h-screen">
          <AnimatePresence
            exitBeforeEnter
            initial={false}
            onExitComplete={() => window.scrollTo(0, 0)}
          >
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
          <Footer />
        </div>
      </QueryClientProvider>
    </>
  );
}
export default MyApp;
