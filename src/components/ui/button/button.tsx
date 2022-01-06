import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeVariants } from "../global";
import { Loading } from "../loading/loading";

// @ts-ignore
export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  mode?: "outline" | "fill";
  notifier?: React.ReactNode;
  rounded?: boolean;
  theme?: ThemeVariants;
  icon?: string;
  responsive?: boolean;
  className?: string;
  disabled?: boolean;
  isBusy?: boolean;
  href?: string;
  to?: string;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    setBusy: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
}

export const Button: React.FC<ButtonProps> = ({
  mode = "fill",
  theme,
  notifier,
  rounded = false,
  icon,
  className,
  onClick,
  disabled,
  isBusy = false,
  responsive = false,
  href,
  to,
  children,
  ...rest
}) => {
  const [Busy, setBusy] = useState(isBusy);
  const Navigate = useNavigate();

  const ClassesConfig: Record<
    ThemeVariants,
    { default: string; fill: string; outline: string }
  > = {
    primary: {
      default: "hover:bg-primary-600 ring-primary-500",
      fill: "bg-primary-500 text-white border-transparent",
      outline:
        "bg-transparent text-primary-500 hover:text-white border-primary-500",
    },
    secondary: {
      default: "hover:bg-secondary-600 ring-secondary-500",
      fill: "bg-secondary-500 text-black border-transparent",
      outline:
        "bg-transparent text-secondary-500 hover:text-black border-secondary-500",
    },
    tertiary: {
      default: "hover:bg-tertiary-600 ring-tertiary-500",
      fill: "bg-tertiary-500 text-white border-transparent",
      outline:
        "bg-transparent text-tertiary-500 hover:text-white border-tertiary-500",
    },
    warning: {
      default: "hover:bg-warning-600 ring-warning-500",
      fill: "bg-warning-500 text-black border-transparent",
      outline:
        "bg-transparent text-warning-500 hover:text-black border-warning-500",
    },
    danger: {
      default: "hover:bg-danger-600 ring-danger-500",
      fill: "bg-danger-500 text-white border-transparent",
      outline:
        "bg-transparent text-danger-500 hover:text-white border-danger-500",
    },
    success: {
      default: "hover:bg-success-600 ring-success-500",
      fill: "bg-success-500 text-white border-transparent",
      outline:
        "bg-transparent text-success-500 hover:text-white border-success-500",
    },
    info: {
      default: "hover:bg-info-600 ring-info-500",
      fill: "bg-info-500 text-white border-transparent",
      outline: "bg-transparent text-info-500 hover:text-white border-info-500",
    },
    muted: {
      default: "hover:bg-muted-600 ring-muted-500",
      fill: "bg-muted-500 text-white border-transparent",
      outline:
        "bg-transparent text-muted-500 hover:text-white border-muted-500",
    },
    light: {
      default: "hover:bg-stone-50 ring-stone-50",
      fill: "bg-light text-black",
      outline:
        "bg-transparent text-black dark:text-white dark:hover:text-black",
    },
  };

  return (
    <button
      className={`flex justify-center 
      items-center text-sm gap-x-1 p-2
      shadow-sm transition 
      focus:ring-2 ring-offset-2 dark:ring-offset-black 
      border-2 active:scale-[1.05] cursor-pointer relative ${
        rounded ? "rounded-full" : "rounded-xl"
      } ${ClassesConfig[theme || "light"].default} ${
        ClassesConfig[theme || "light"][mode]
      } ${className} ${(Busy || disabled) && "opacity-80"}`}
      onClick={(e) => {
        if (typeof onClick === "function") onClick?.(e, setBusy);
        else if (typeof href === "string") window.location.href = href;
        else if (typeof to === "string") Navigate(to);
      }}
      disabled={Busy}
      {...rest}
    >
      {Busy && <Loading />}
      {!Busy && icon && <i className={`${icon} fill-current`}></i>}
      {children && (
        <div className={(icon || Busy) && responsive ? "hidden sm:block" : ""}>
          {children}
        </div>
      )}
      {React.isValidElement(notifier) && notifier}
    </button>
  );
};
