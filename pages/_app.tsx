import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import Header from "../components/Header";
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
export default MyApp;
