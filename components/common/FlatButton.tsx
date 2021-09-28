import React from "react";
import tw, { css, styled } from "twin.macro";

export interface FlatButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const StyledButton = styled.button((props) => [
  tw`
   px-4 py-2 text-base border rounded-lg text-gray-700 bg-white hover:bg-gray-200`,
]);

export default function FlatButton({ children, ...props }: FlatButtonProps) {
  return <StyledButton {...props}>{children}</StyledButton>;
}
