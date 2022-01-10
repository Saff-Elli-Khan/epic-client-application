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
  const ClassesConfig: {
    default: string;
    transparent: string;
    outline: string;
  } = {
    default: `${
      theme === "light" ? `text-black dark:text-light-500` : `text-${theme}-500`
    }`,
    transparent: `${
      theme === "light"
        ? "border-stone-500/20"
        : `bg-${theme}-500/20 border-transparent`
    }`,
    outline: `bg-transparent ${theme === "light"? 'border-stone-500 border-opacity-20' : `border-${theme}-500 border-opacity-20`}`,
  };

  return (
    <div
      className={`flex flex-row items-center gap-x-2 border-2 shadow-sm ${ClassesConfig.default} ${ClassesConfig[mode]} 
      py-1.5 px-2.5 rounded-full max-w-[150px] disabled:opacity-80 ${className}`}
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
