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
            <div>
              <h4>{user.username}</h4>
              <p>{user.email}</p>
            </div>
          );
        })}
    </div>
  );
}
