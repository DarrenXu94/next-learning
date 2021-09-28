import { useField } from "formik";
import React from "react";
import Input from "../common/Input";

export default function TextInput(props: any) {
  const [field, meta] = useField(props);

  return (
    <div className="relative">
      <label className="text-gray-700" htmlFor={props.id || props.name}>
        {props.label}
      </label>
      <Input {...field} type={props.type} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
}
