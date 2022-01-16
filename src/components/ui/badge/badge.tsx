import React from "react";
import { ThemeVariants } from "../global";

export interface BadgeProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  theme?: ThemeVariants;
  mode?: "outline" | "fill" | "transparent";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  theme,
  mode = "fill",
  className,
  children,
  ...rest
}) => {
  const ClassesConfig: {
    fill: string;
    outline: string;
    transparent: string;
  } = {
    fill: `bg-${theme}-500 ${
      theme === "light" ? "text-black border-stone-300" : "text-white"
    } border-transparent`,
    outline: `bg-transparent ${
      theme === "light"
        ? "text-black dark:text-white"
        : `border-${theme}-500 text-${theme}-500`
    }`,
    transparent: `${
      theme === "light"
        ? "text-black dark:text-white"
        : `border-transparent bg-${theme}-500/20 text-${theme}-500`
    }`,
  };

  return (
    <>
      <div className={`flex flex-row items-center ${className}`}>
        <div
          className={`${
            React.isValidElement(children) ? "px-1" : "p-1 !border-light"
          } rounded-full border shadow-sm  ${ClassesConfig[mode]}`}
          {...rest}
        >
          {React.isValidElement(children) && children}
        </div>
      </div>
    </>
  );
};
