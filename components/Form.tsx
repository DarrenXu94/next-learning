import React from "react";

export interface FormProps {
  onSubmit: (event: React.SyntheticEvent) => void;
  errorMessage: string;
}

export default function Form({ onSubmit, errorMessage }: FormProps) {
  return (
    <form onSubmit={onSubmit}>
      <label>
        <input type="text" name="username" required />
        <input type="text" name="password" required />
      </label>

      <button type="submit">Login</button>

      {errorMessage && <p className="error">{errorMessage}</p>}
    </form>
  );
}
