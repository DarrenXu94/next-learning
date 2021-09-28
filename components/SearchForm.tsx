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
      <Form className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
        <TextInput name="searchTerm" type="text" placeholder="Search..." />

        <Button type="submit">Search</Button>
      </Form>
    </Formik>
  );
}
