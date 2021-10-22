import type { NextPage } from "next";
import Head from "next/head";
import Router from "next/router";
import useSession from "../lib/useSession";
import Layout from "../components/Layout";
import { getAllPostsAPI } from "../services/post";
import PostRoll from "../components/PostRoll";
import useGetAllPosts from "../lib/useGetAllPosts";
import LoadingOverlay from "../components/LoadingOverlay";
import { getAllPosts } from "./api/posts";

const Home = ({ posts }) => {
  // const { posts, error, isLoading } = useGetAllPosts();
  console.log({ posts });

  return (
    <Layout
      title="NextJS Blog"
      description="See the latest posts"
      // isLoading={isLoading}
    >
      <div className="header flex items-end justify-between mb-12 flex-col md:flex-row">
        <div className="title">
          <p className="text-4xl font-bold text-gray-800 mb-4">All Posts</p>
        </div>
      </div>
      {posts && <PostRoll posts={posts} />}
    </Layout>
  );
};

export default Home;

export async function getServerSideProps(context) {
  const res = await getAllPosts();

  return {
    props: { posts: JSON.parse(JSON.stringify(res)) }, // will be passed to the page component as props
  };
}
