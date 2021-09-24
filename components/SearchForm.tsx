import React from "react";
import Router from "next/router";

export interface SearchFormProps {}

export default function SearchForm({}: SearchFormProps) {
  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.currentTarget as typeof event.currentTarget & {
      searchTerm: { value: string };
    };
    Router.push(`/search/${target.searchTerm.value}`);
  };
  return (
    <form onSubmit={onSubmit}>
      <h2>Search</h2>
      <label>
        <input type="text" name="searchTerm" required />
      </label>

      <button type="submit">Search</button>
    </form>
  );
}
