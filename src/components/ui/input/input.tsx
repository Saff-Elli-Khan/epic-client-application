import React, { isValidElement, useEffect, useState } from "react";
import { Button } from "../button/button";
import { Omit, ThemeVariants } from "../global";

// @ts-ignore
export interface InputProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "className"
  > {
  theme?: ThemeVariants;
  mode?: "transparent" | "outline";
  wrapperClassName?: string;
  containerClassName?: string;
  inputClassName?: string;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    setBusy: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
  isBusy?: boolean;
  message?: string;
  left?: () => React.ReactElement;
  right?: () => React.ReactElement;
}

export const Input: React.FC<InputProps> = ({
  theme,
  mode = "transparent",
  type = "text",
  wrapperClassName,
  containerClassName,
  inputClassName,
  onClick,
  isBusy = false,
  disabled = false,
  message = null,
  left,
  right,
  ...rest
}) => {
  const [InputProps, setInputProps] = useState<{
    theme?: ThemeVariants;
    showPassword: boolean;
    disabled: boolean;
    message: string | null;
  }>({
    showPassword: false,
    disabled: disabled,
    message: null,
    theme: theme,
  });

  useEffect(() => {
    setInputProps((prev) => ({ ...prev, theme, disabled, message }));
  }, [message, theme, disabled]);

  const ClassesConfig: { transparent: string; outline: string } = {
    transparent: `bg-${theme}-500/20 ${
      theme === "light" && "text-black dark:text-white border-stone-200"
    } border-transparent`,
    outline: `bg-transparent ${
      theme === "light"
        ? `text-dark-500 dark:text-light-500 border-stone-500/20`
        : `border-${theme}-500`
    }`,
  };

  return (
    <div className={wrapperClassName}>
      <div
        className={`px-2 flex items-center border-2 ${ClassesConfig[mode]} rounded-xl shadow-sm disabled:opacity-80 ${containerClassName}`}
      >
        {typeof left === "function" && isValidElement(left()) ? left() : null}
        <input
          type={
            type === "password"
              ? InputProps.showPassword
                ? "text"
                : "password"
              : type
          }
          disabled={InputProps.disabled || isBusy}
          className={`rounded-none w-full p-2 bg-transparent 
          placeholder:text-sm ${
            theme === "light"
              ? "placeholder:text-dark-500 dark:placeholder:text-light-500"
              : `placeholder:text-${InputProps.theme}-500`
          } dark:text-white outline-none appearance-none rounded-none ${inputClassName}`}
          {...rest}
        />
        {typeof right === "function" && isValidElement(right()) ? (
          right()
        ) : type && ["password", "search"].includes(type) ? (
          <Button
            mode="basic"
            icon={`las la-${
              type === "password"
                ? InputProps.showPassword
                  ? "eye-slash"
                  : "eye"
                : "search"
            } text-${InputProps.theme}-500`}
            loadingClassName={
              theme === "light"
                ? "text-black dark:text-white"
                : `text-${theme}-500`
            }
            isBusy={isBusy}
            onClick={(e, setBusy) => {
              if (type !== "search")
                setInputProps((prev) => ({
                  ...prev,
                  showPassword: prev.showPassword = !prev.showPassword,
                }));
              onClick?.(e, setBusy);
            }}
          />
        ) : null}
      </div>
      {InputProps.message && (
        <p
          className={`text-xs pt-1 ${
            ["warning", "danger", "success"].includes(InputProps.theme || "")
              ? `text-${InputProps.theme}-500`
              : "text-stone-500"
          }`}
        >
          {InputProps.message}
        </p>
      )}
    </div>
  );
};
