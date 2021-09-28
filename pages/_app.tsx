import "../styles/globals.css";
import "../styles/application.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import Header from "../components/Header";
import { ReactQueryDevtools } from "react-query/devtools";
import "tailwindcss/tailwind.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />

      <Header />
      <div className="pt-24">
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
}
export default MyApp;
