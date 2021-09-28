import React from "react";
import Router from "next/router";
import { Formik, Form } from "formik";
import Button from "./common/Button";
import TextInput from "./form/TextInput";

export interface SearchFormProps {}

export default function SearchForm({}: SearchFormProps) {
  const onSubmit = ({ searchTerm }) => {
    Router.push(`/search/${searchTerm}`);
  };
  return (
    <Formik
      initialValues={{ searchTerm: "" }}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit({ searchTerm: values.searchTerm });
        setSubmitting(false);
      }}
    >
      <Form>
        <label htmlFor="searchTerm">Search</label>
        <TextInput
          name="searchTerm"
          type="text"
          placeholder="Search a blog title or body"
        />

        <Button type="submit">Submit</Button>
      </Form>
    </Formik>
  );
}
