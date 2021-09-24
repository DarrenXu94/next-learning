import Link from "next/link";
import React from "react";
import useUser from "../../lib/useUser";

export interface UserIndexProps {}

export default function UserIndex({}: UserIndexProps) {
  const { getAllUsers } = useUser();

  const { data: users } = getAllUsers();

  return (
    <div>
      {users &&
        users.map((user) => {
          return (
            <div key={user._id}>
              <Link href={`/user/${user.username}`}>
                <a>
                  <h4>{user.username}</h4>
                  <p>{user.email}</p>
                </a>
              </Link>
            </div>
          );
        })}
    </div>
  );
}
