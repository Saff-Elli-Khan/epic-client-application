import React, { useEffect } from "react";
import { ThemeVariants } from "../global";

export interface BadgeProps {
  theme?: ThemeVariants;
  mode?: "outline" | "fill" | "transparent";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  theme,
  mode = "fill",
  className,
  children,
}) => {
  const ClassesConfig: Record<
    ThemeVariants,
    { default: string; fill: string; outline: string; transparent: string }
  > = {
    primary: {
      default: "",
      fill: "bg-primary-500 text-white border-transparent",
      outline: "bg-transparent border-primary-500 text-primary-500",
      transparent: "bg-primary-500/20 border-transparent text-primary-500",
    },
    secondary: {
      default: "",
      fill: "bg-secondary-500 text-black border-transparent",
      outline: "bg-transparent border-secondary-500 text-secondary-500",
      transparent: "bg-secondary-500/20 border-transparent text-secondary-500",
    },
    tertiary: {
      default: "",
      fill: "bg-tertiary-500 text-white border-transparent",
      outline: "bg-transparent border-tertiary-500 text-tertiary-500",
      transparent: "bg-tertiary-500/20 border-transparent text-tertiary-500",
    },
    warning: {
      default: "",
      fill: "bg-warning-500 text-black border-transparent",
      outline: "bg-transparent border-warning-500 text-warning-500",
      transparent: "bg-warning-500/20 border-transparent text-warning-500",
    },
    danger: {
      default: "",
      fill: "bg-danger-500 text-white border-transparent",
      outline: "bg-transparent border-danger-500 text-danger-500",
      transparent: "bg-danger-500/20 border-transparent text-danger-500",
    },
    success: {
      default: "",
      fill: "bg-success-500 text-white border-transparent",
      outline: "bg-transparent border-success-500 text-success-500",
      transparent: "bg-success-500/20 border-transparent text-success-500",
    },
    info: {
      default: "",
      fill: "bg-info-500 text-white border-transparent",
      outline: "bg-transparent border-info-500 text-info-500",
      transparent: "bg-info-500/20 border-transparent text-info-500",
    },
    muted: {
      default: "",
      fill: "bg-muted-500 text-white border-transparent",
      outline: "bg-transparent border-muted-500 text-muted-500",
      transparent: "bg-muted-500/20 border-transparent text-muted-500",
    },
    light: {
      default: "",
      fill: "bg-light text-black",
      outline: "bg-transparent border-light dark:text-white",
      transparent: "bg-transparent border-transparent text-black",
    },
  };

  return (
    <>
      <div className={`flex flex-row items-center ${className}`}>
        <div
          className={`${
            React.isValidElement(children) ? "px-1" : "p-1 !border-light"
          } rounded-full border shadow-sm ${ClassesConfig[theme || "muted"].default} ${
            ClassesConfig[theme || "muted"][mode]
          }`}
        >
          {React.isValidElement(children) && children}
        </div>
      </div>
    </>
  );
};
