import ErrorPage from "next/error";
import { useRouter } from "next/router";
import React from "react";
import PostRoll from "../../components/PostRoll";
import useSearchPosts from "../../lib/useSearchPosts";

export interface SearchPageProps {}

export default function SearchPage({}: SearchPageProps) {
  const router = useRouter();
  const { searchTerm } = router.query;

  const { posts, error } = useSearchPosts(searchTerm as string);

  if (error) {
    return <ErrorPage statusCode={error.status} />;
  }

  return (
    <div className="bg-white rounded shadow max-w-screen-lg	m-auto p-5">
      <div className="pb-10 px-4 md:px-6">
        <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
          Search results for &quot;{searchTerm}&quot;
        </h1>
      </div>

      <PostRoll posts={posts} />

      {posts && !posts.length && <div>No results for {searchTerm}</div>}
    </div>
  );
}
