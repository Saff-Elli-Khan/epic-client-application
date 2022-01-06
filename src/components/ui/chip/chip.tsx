import React from "react";
import { Button, ButtonProps } from "../button/button";
import { Omit, ThemeVariants } from "../global";

export interface ChipProps {
  theme?: ThemeVariants;
  mode?: "outline" | "transparent";
  icon?: string;
  className?: string;
  cancelable?: boolean;
  closeBtnProps?: Omit<ButtonProps, "theme" | "icon" | "rounded">;
}

export const Chip: React.FC<ChipProps> = ({
  theme = "muted",
  mode = "transparent",
  cancelable = false,
  className,
  icon,
  closeBtnProps,
  children,
}) => {
  const ClassesConfig: Record<
    ThemeVariants,
    { default: string; transparent: string; outline: string }
  > = {
    primary: {
      default: "text-primary-500",
      transparent: "bg-primary-500/20 border-transparent",
      outline: "bg-transparent border-primary-500/20",
    },
    secondary: {
      default: "text-secondary-500",
      transparent: "bg-secondary-500/20 border-transparent",
      outline: "bg-transparent border-secondary-500/20",
    },
    tertiary: {
      default: "text-tertiary-500",
      transparent: "bg-tertiary-500/20 border-transparent",
      outline: "bg-transparent border-tertiary-500/20",
    },
    warning: {
      default: "text-warning-500",
      transparent: "bg-warning-500/20 border-transparent",
      outline: "bg-transparent border-warning-500/20",
    },
    danger: {
      default: "text-danger-500",
      transparent: "bg-danger-500/20 border-transparent",
      outline: "bg-transparent border-danger-500/20",
    },
    success: {
      default: "text-success-500",
      transparent: "bg-success-500/20 border-transparent",
      outline: "bg-transparent border-success-500/20",
    },
    info: {
      default: "text-info-500",
      transparent: "bg-info-500/20 border-transparent",
      outline: "bg-transparent border-info-500/20",
    },
    muted: {
      default: "text-muted-500",
      transparent: "bg-muted-500/20 border-transparent",
      outline: "bg-transparent border-muted-500/20",
    },
    light: {
      default: "text-black !border",
      transparent: "bg-light text-black",
      outline: "bg-transparent dark:text-white",
    },
  };

  return (
    <div
      className={`flex flex-row items-center gap-x-2 border-2 shadow-sm ${
        ClassesConfig[theme || "muted"].default
      } ${
        ClassesConfig[theme || "muted"][mode]
      } py-1.5 px-2.5 rounded-full max-w-[150px] ${className}`}
    >
      {icon && <i className="las la-map-pin fill-current"></i>}
      <p className="text-sm truncate text-ellipsis">{children}</p>
      {cancelable && (
        <Button
          theme={theme}
          icon="las la-times"
          className="p-0"
          rounded
          {...closeBtnProps}
        />
      )}
    </div>
  );
};
