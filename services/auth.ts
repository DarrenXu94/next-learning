import { server } from "../config";
import { HTTPResponse } from "../interfaces/HTTP";

export async function auth({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<HTTPResponse> {
  // Attempt to log in
  try {
    const login = await fetch(`${server}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (login.status !== 200) {
      return {
        status: login.status,
        statusText: login.statusText,
      };
    }
    return {
      status: login.status,
      statusText: login.statusText,
      body: await login.json(),
    };
  } catch (e) {
    return {
      status: 500,
      statusText: e as string,
    };
  }
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
  try {
    const register = await fetch(`${server}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email }),
    });

    console.log(register);

    if (register.status !== 200) {
      return {
        status: register.status,
        statusText: register.statusText,
      };
    }

    return {
      status: register.status,
      statusText: register.statusText,
      body: await register.json(),
    };
  } catch (e) {
    return {
      status: 500,
      statusText: e as string,
    };
  }
}
