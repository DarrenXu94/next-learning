import { useField } from "formik";
import React from "react";

export default function TextInput(props: any) {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{props.label}</label>
      <input className="text-input" {...field} type={props.type} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
}
