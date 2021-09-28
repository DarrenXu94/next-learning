import { useField } from "formik";
import React from "react";
import Textarea from "../common/Textarea";

export default function TextAreaInput({ ...props }: any) {
  const [field, meta] = useField(props);

  return (
    <label className="text-gray-700" htmlFor={props.name}>
      <Textarea {...field} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </label>
  );
}
