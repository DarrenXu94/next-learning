import { useRouter } from "next/router";
import React from "react";

export interface SearchPageProps {}

export default function SearchPage({}: SearchPageProps) {
  const router = useRouter();
  const { searchTerm } = router.query;

  console.log({ searchTerm });

  return <div></div>;
}
