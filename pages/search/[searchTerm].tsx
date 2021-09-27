import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import usePost from "../../lib/usePost";

export interface SearchPageProps {}

export default function SearchPage({}: SearchPageProps) {
  const router = useRouter();
  const { searchTerm } = router.query;

  console.log({ searchTerm });

  const { searchPosts } = usePost();
  const { data: posts } = searchPosts(searchTerm as string);

  console.log({ posts });

  return (
    <div>
      {posts &&
        posts.map((post) => {
          return (
            <div key={post._id}>
              <Link href={`/post/${post._id}`}>
                <a>
                  <h4>{post.title}</h4>
                  <p>{post.body}</p>
                </a>
              </Link>
            </div>
          );
        })}

      {posts && !posts.length && <div>No results for {searchTerm}</div>}
    </div>
  );
}
