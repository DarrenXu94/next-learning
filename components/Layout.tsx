import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";

export interface LayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  noClass?: boolean;
}
const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

export default function Layout({
  children,
  title,
  description,
  noClass,
}: LayoutProps) {
  return (
    <div>
      <NextSeo
        title={title}
        description={description}
        openGraph={{ title, description }}
      />

      <motion.main
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ type: "linear" }}
        className={
          noClass ? "" : "w-full bg-white p-12 max-w-screen-lg m-auto rounded"
        }
      >
        {children}
      </motion.main>
    </div>
  );
}
