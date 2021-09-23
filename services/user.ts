import { HTTPResponse } from "../interfaces/HTTP";

export async function getAllUsersAPI(): Promise<HTTPResponse> {
  const users = await fetch(`http://localhost:8080/profile`, {
    method: "GET",
  });

  return {
    status: users.status,
    statusText: users.statusText,
    body: await users.json(),
  };
}
