import React, { useState } from "react";
import { Translate } from "../../../hooks/translator";
import { Loading } from "../loading/loading";

// @ts-ignore
export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label?: string;
  className?: string;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    setBusy: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  className,
  onClick,
  ...rest
}) => {
  const [Busy, setBusy] = useState(false);

  return (
    <>
      <button
        className={`flex justify-center items-center text-sm gap-x-1 py-2 px-4 bg-stone-800 rounded-xl shadow-sm text-white transition focus:ring-2 ring-offset-2 dark:ring-offset-black ring-stone-800 hover:bg-stone-900 active:scale-[1.05] ${
          Busy && "opacity-80"
        } ${className}`}
        onClick={(e) => onClick?.(e, setBusy)}
        disabled={Busy}
        {...rest}
      >
        {Busy && <Loading />}
        <Translate string={label || "Button"} />
      </button>
    </>
  );
};
