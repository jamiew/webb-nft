import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

import { PendingIcon } from "./PendingIcon";

const buttonClasses =
  "flex self-center transition text-black text-sm bg-white hover:bg-gray-100 active:bg-gray-200 disabled:bg-slate-400 enabled:cursor-pointer px-4 py-2 rounded-sm shadow-sm";

type Props = {
  children: React.ReactNode;
  pending?: boolean;
};

type ButtonProps = Props &
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button = ({
  pending,
  type,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type || "button"}
      className={className ? `${buttonClasses} ${className}` : buttonClasses}
      disabled={disabled || pending}
      {...props}
    >
      {children}
      {pending ? (
        <span className="self-center ml-2 -mr-1">
          <PendingIcon />
        </span>
      ) : null}
    </button>
  );
};
