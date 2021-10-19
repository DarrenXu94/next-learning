import ErrorPage from "next/error";
import Link from "next/link";
import React from "react";
import Layout from "../../components/Layout";
import UserCard from "../../components/UserCard";
import useAllUsers from "../../lib/useAllUsers";

export interface UserIndexProps {}

export default function UserIndex({}: UserIndexProps) {
  const { users, error, isLoading } = useAllUsers();

  if (error) {
    return <ErrorPage statusCode={error.status} />;
  }

  return (
    <Layout
      title="All users"
      description="View all users"
      isLoading={isLoading}
    >
      <div className="container grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full items-center justify-center flex-wrap max-w-screen-lg m-auto">
        {users &&
          users.map((user) => {
            return (
              <div key={user._id}>
                <Link href={`/user/${user.username}`}>
                  <a>
                    <UserCard user={user} />
                  </a>
                </Link>
              </div>
            );
          })}
      </div>
    </Layout>
  );
}
