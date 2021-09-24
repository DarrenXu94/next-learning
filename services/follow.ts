import { HTTPResponse } from "../interfaces/HTTP";

export async function getFollowersOfUserAPI({
  username,
}: {
  username: string;
}): Promise<HTTPResponse> {
  const followers = await fetch(
    `http://localhost:8080/profile/${username}/followers`,
    {
      method: "GET",
    }
  );

  return {
    status: followers.status,
    statusText: followers.statusText,
    body: await followers.json(),
  };
}

export async function getUserFollowingAPI({
  username,
}: {
  username: string;
}): Promise<HTTPResponse> {
  const following = await fetch(
    `http://localhost:8080/profile/${username}/following`,
    {
      method: "GET",
    }
  );

  return {
    status: following.status,
    statusText: following.statusText,
    body: await following.json(),
  };
}

export async function FollowUserAPI({
  username,
  token,
}: {
  username: string;
  token: string;
}): Promise<HTTPResponse> {
  const addFollow = await fetch(`http://localhost:8080/addFollow/${username}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  return {
    status: addFollow.status,
    statusText: addFollow.statusText,
    body: await addFollow.json(),
  };
}

export async function UnfollowUserAPI({
  username,
  token,
}: {
  username: string;
  token: string;
}): Promise<HTTPResponse> {
  const removeFollow = await fetch(
    `http://localhost:8080/removeFollow/${username}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    }
  );

  return {
    status: removeFollow.status,
    statusText: removeFollow.statusText,
    body: await removeFollow.json(),
  };
}
