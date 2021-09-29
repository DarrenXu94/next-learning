import { useField } from "formik";
import React from "react";
import Textarea from "../common/Textarea";

export default function TextAreaInput({ ...props }: any) {
  const [field, meta] = useField(props);

  return (
    <div>
      <label className="text-gray-700" htmlFor={props.name}>
        {props.label}
      </label>
      <Textarea {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
}
