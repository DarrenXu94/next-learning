import { server } from "../config";
import { HTTPResponse } from "../interfaces/HTTP";

export async function getAllUsersAPI(): Promise<HTTPResponse> {
  try {
    const users = await fetch(`${server}/api/user`, {
      method: "GET",
    });
    if (users.status !== 200) {
      return {
        status: users.status,
        statusText: users.statusText,
      };
    }

    return {
      status: users.status,
      statusText: users.statusText,
      body: await users.json(),
    };
  } catch (e) {
    return {
      status: 500,
      statusText: e as string,
    };
  }
}
