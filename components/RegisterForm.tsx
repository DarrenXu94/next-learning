import React from "react";

export interface RegisterFormProps {
  onSubmit: (event: React.SyntheticEvent) => void;
  errorMessage: string;
}

export default function RegisterForm({
  onSubmit,
  errorMessage,
}: RegisterFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <label>
        Username
        <input type="text" name="username" required />
        Email
        <input type="text" name="email" required />
        Password
        <input type="text" name="password" required />
      </label>

      <button type="submit">Register</button>

      {errorMessage && <p className="error">{errorMessage}</p>}
    </form>
  );
}
