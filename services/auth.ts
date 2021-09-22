import { HTTPResponse } from "../interfaces/HTTP";

export async function auth({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<HTTPResponse> {
  // Attempt to log in
  const login = await fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  return {
    status: login.status,
    statusText: login.statusText,
    body: await login.json(),
  };
}

export async function register({
  username,
  password,
  email,
}: {
  username: string;
  password: string;
  email: string;
}): Promise<HTTPResponse> {
  // Attempt to log in
  const register = await fetch("http://localhost:8080/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, email }),
  });

  return {
    status: register.status,
    statusText: register.statusText,
    body: await register.json(),
  };
}
