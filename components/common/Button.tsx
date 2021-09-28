import React from "react";

import tw, { css, styled } from "twin.macro";

interface IStyle {
  green?: boolean;
  purple?: boolean;
  iconOnly?: boolean;
  withShadow?: boolean;
  noBorder?: boolean;
  noPadding?: boolean;
}

const StyledButton = styled.button<IStyle>((props) => [
  tw`
  py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg 
    `,
  props.green &&
    tw`text-white bg-green-400 ring-gray-200 hover:(text-white bg-green-600)`,
  props.purple &&
    tw`text-white bg-pink-600 ring-white hover:(text-white bg-pink-700)`,
  props.iconOnly &&
    tw`outline-none flex flex-col items-center justify-center rounded-full w-12 h-12 md:(w-14 h-14)`,
  props.withShadow && tw`shadow-xl`,
  props.noBorder && tw`ring-0`,
  props.noPadding && tw`px-0 py-0`,
  css`
    & + button {
      ${tw`ml-2`}
    }
  `,
]);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
}

const Button: React.FC<ButtonProps & IStyle> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;
