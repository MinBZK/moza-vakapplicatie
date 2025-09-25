import React, { ReactNode } from "react";

interface Props extends React.HTMLProps<HTMLButtonElement> {
  type?: "submit" | "reset" | "button" | undefined;
  children: ReactNode;
}

const Button = ({ children, type = "button", ...props }: Props) => {
  return (
    <button
      {...props}
      type={type}
      className="bg-primary hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700 inline-block w-fit cursor-pointer rounded px-6 pt-2.5 pb-2 text-xs leading-normal font-extrabold text-white uppercase shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:ring-0 focus:outline-none active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
    >
      {children}
    </button>
  );
};

export default Button;
