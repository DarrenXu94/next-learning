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
import "../styles/TipTap.scss";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CustomToast />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />

        <main className="bg-gray-100 dark:bg-gray-800 h-screen overflow-hidden relative">
          <Header />
          <div className="pt-24 h-full">
            <Component {...pageProps} />
          </div>
        </main>
        <Footer />
      </QueryClientProvider>
    </>
  );
}
export default MyApp;
