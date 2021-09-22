export async function auth({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  // Attempt to log in
  const login = await fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  return login;
}

export async function register({
  username,
  password,
  email,
}: {
  username: string;
  password: string;
  email: string;
}) {
  // Attempt to log in
  const login = await fetch("http://localhost:8080/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, email }),
  });

  return login;
}
