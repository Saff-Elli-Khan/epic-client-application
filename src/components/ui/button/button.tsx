import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeVariants } from "../global";
import { Loading, LoadingProps } from "../loading/loading";

// @ts-ignore
export interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    LoadingProps {
  mode?: "outline" | "fill" | "basic" | "transparent";
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
  loadingClassName,
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
  const [Disabled, setDisabled] = useState(disabled);
  const Navigate = useNavigate();

  useEffect(() => {
    setBusy(isBusy);
    setDisabled(disabled);
  }, [isBusy, disabled]);

  const ClassesConfig: {
    fill: string;
    outline: string;
    transparent: string;
  } = {
    fill: `bg-${theme}-500 ${
      theme === "light" ? "text-black" : "text-white"
    } border-transparent`,
    outline: `bg-transparent ${
      theme === "light"
        ? `text-black dark:text-light-500 dark:hover:text-black border-stone-200`
        : `text-${theme}-500 hover:text-white border-${theme}-500`
    }`,
    transparent: `bg-${theme}-500 bg-opacity-20 ${
      theme === "light" ? "text-black" : `text-${theme}-500 hover:text-white`
    } border-transparent`,
  };

  return (
    <button
      className={`relative appearance-none flex justify-center 
      items-center text-sm gap-x-1 p-2 transition active:scale-[1.05] cursor-pointer select-none
      ${
        mode !== "basic"
          ? `focus:ring-2 ring-offset-2 dark:ring-offset-black shadow-sm border-2 disabled:opacity-80 hover:bg-${theme}-600 ring-${theme}-500 ${ClassesConfig[mode]}`
          : `${theme === "light" ? "text-black" : `text-${theme}-500`}`
      } ${rounded ? "rounded-full" : "rounded-xl"} ${className}`}
      onClick={(e) => {
        if (typeof onClick === "function") onClick?.(e, setBusy);
        else if (typeof href === "string") window.location.href = href;
        else if (typeof to === "string") Navigate(to);
      }}
      disabled={Busy || Disabled}
      {...rest}
    >
      {Busy && (
        <Loading loadingClassName={`fill-current ${loadingClassName}`} />
      )}
      {!Busy && icon && <i className={`${icon} fill-current`}></i>}
      {children ? (
        <div className={(icon || Busy) && responsive ? "hidden sm:block" : ""}>
          {children}
          {React.isValidElement(notifier) && notifier}
        </div>
      ) : (
        React.isValidElement(notifier) && notifier
      )}
    </button>
  );
};
