import React from "react";
import tw, { css, styled } from "twin.macro";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

interface IStyle {}

const StyledTextarea = styled.textarea<IStyle>((props) => [
  tw`flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent`,
]);

export default function Textarea({ ...props }: TextareaProps) {
  return <StyledTextarea {...props} />;
}
