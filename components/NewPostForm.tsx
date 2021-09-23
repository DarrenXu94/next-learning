import React from "react";

export interface NewPostFormProps {
  onSubmit: (event: React.SyntheticEvent) => void;
  errorMessage: string;
}

export default function NewPostForm({
  onSubmit,
  errorMessage,
}: NewPostFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <label>
        <input type="text" name="title" required />
        <input type="text" name="body" required />
      </label>

      <button type="submit">Create</button>

      {errorMessage && <p className="error">{errorMessage}</p>}
    </form>
  );
}
