import type { NextPage } from "next";
import Head from "next/head";
import Router from "next/router";
import useSession from "../lib/useSession";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  useSession({
    redirectTo: "/feed",
    redirectIfFound: true,
  });

  return (
    <Layout
      title="NextJS Practice Blog"
      description="NextJS Practice Blog"
      noClass
    >
      <div className="-mb-24">
        <Head>
          <title>Blog</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="w-full h-screen font-sans bg-cover bg-landscape -mt-24">
          <div className="container flex  justify-center flex-1 h-full mx-auto">
            <div className="container mx-auto px-6 md:px-12 relative z-10 flex  py-32 xl:py-40">
              <div className="w-full flex flex-col items-center relative z-10 ">
                <div className="p-10 bg-white bg-opacity-25 rounded shadow-xl">
                  <h1 className="font-extrabold text-7xl text-center sm:text-8xl text-black leading-tight mt-4">
                    NextJS Practice Blog
                  </h1>
                  <a
                    href="#"
                    onClick={() => {
                      Router.push(`/login`);
                    }}
                    className="rounded block bg-gray-800 hover:bg-gray-900 py-3 px-4 text-lg text-white font-bold uppercase mt-10 w-max m-auto"
                  >
                    Login
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
