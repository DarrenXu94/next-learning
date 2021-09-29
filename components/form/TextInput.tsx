import { useField } from "formik";
import React, { useEffect } from "react";
import Input from "../common/Input";

export default function TextInput({ ...props }: any) {
  const [field, meta] = useField(props);

  return (
    <div className="relative">
      <label className="text-gray-700" htmlFor={props.id || props.name}>
        {props.label}
      </label>
      <Input
        className={meta.error && meta.touched && "ring-red-500 ring-2"}
        {...field}
        type={props.type}
        {...props}
      />
      {meta.touched && meta.error ? (
        <p className="text-sm text-red-500 ">{meta.error}</p>
      ) : null}
    </div>
  );
}
