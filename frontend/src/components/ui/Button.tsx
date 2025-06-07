import { ReactElement } from "react";

export interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
}

const variantStyle = {
  primary: "bg-blue-600 text-white",
  secondary: "bg-blue-100 text-purple-600",
};

const defaultStyles =
  "rounded-md px-4 py-2 font-light flex items-center h-fit gap-1 w-fit";

const sizeStyles = {
  sm: "py-1 px-2 ",
  md: "py-2 px-4 ",
  lg: "py-4 px-6",
};

export const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`
                        ${variantStyle[props.variant]} 
                        ${defaultStyles}
                        ${sizeStyles[props.size]}`}
    >
      {props.startIcon}
      {props.text}
      {props.endIcon}
    </button>
  );
};
