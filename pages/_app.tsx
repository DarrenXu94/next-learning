import "../styles/TipTap.scss";
import "../styles/globals.scss";
import "../styles/application.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import Header from "../components/Header";
import { ReactQueryDevtools } from "react-query/devtools";
// import "tailwindcss/tailwind.css";
import Footer from "../components/Footer";
import CustomToast from "../components/CustomToast";
import { AnimatePresence } from "framer-motion";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
      cacheTime: 60 * 1000 * 10,
      retry: 1,
    },
  },
});

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <CustomToast />
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={true} /> */}

        <Header />
        <main className="py-24 h-full bg-gray-100 min-h-screen">
          <AnimatePresence
            exitBeforeEnter
            initial={false}
            onExitComplete={() => window.scrollTo(0, 0)}
          >
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </main>
        <Footer />
      </QueryClientProvider>
    </>
  );
}
export default MyApp;
