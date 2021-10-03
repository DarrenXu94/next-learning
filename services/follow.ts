import { HTTPResponse } from "../interfaces/HTTP";

export async function getFollowersOfUserAPI({
  username,
}: {
  username: string;
}): Promise<HTTPResponse> {
  try {
    const followers = await fetch(
      `http://localhost:8080/profile/${username}/followers`,
      {
        method: "GET",
      }
    );
    if (followers.status !== 200) {
      return {
        status: followers.status,
        statusText: followers.statusText,
      };
    }

    return {
      status: followers.status,
      statusText: followers.statusText,
      body: await followers.json(),
    };
  } catch (e) {
    return {
      status: 500,
      statusText: e as string,
    };
  }
}

export async function getUserFollowingAPI({
  username,
}: {
  username: string;
}): Promise<HTTPResponse> {
  try {
    const following = await fetch(
      `http://localhost:8080/profile/${username}/following`,
      {
        method: "GET",
      }
    );
    if (following.status !== 200) {
      return {
        status: following.status,
        statusText: following.statusText,
      };
    }

    return {
      status: following.status,
      statusText: following.statusText,
      body: await following.json(),
    };
  } catch (e) {
    return {
      status: 500,
      statusText: e as string,
    };
  }
}

export async function FollowUserAPI({
  username,
  token,
}: {
  username: string;
  token: string;
}): Promise<HTTPResponse> {
  try {
    const addFollow = await fetch(
      `http://localhost:8080/addFollow/${username}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      }
    );

    if (addFollow.status !== 200) {
      return {
        status: addFollow.status,
        statusText: addFollow.statusText,
      };
    }

    return {
      status: addFollow.status,
      statusText: addFollow.statusText,
      body: await addFollow.json(),
    };
  } catch (e) {
    return {
      status: 500,
      statusText: e as string,
    };
  }
}

export async function UnfollowUserAPI({
  username,
  token,
}: {
  username: string;
  token: string;
}): Promise<HTTPResponse> {
  try {
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

    if (removeFollow.status !== 200) {
      return {
        status: removeFollow.status,
        statusText: removeFollow.statusText,
      };
    }

    return {
      status: removeFollow.status,
      statusText: removeFollow.statusText,
      body: await removeFollow.json(),
    };
  } catch (e) {
    return {
      status: 500,
      statusText: e as string,
    };
  }
}
