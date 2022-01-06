import React, { useState } from "react";
import { Button, ButtonProps } from "../button/button";

export interface FabProps extends ButtonProps {
  containerClassName?: string;
  isOpen?: boolean;
  rotation?: "0" | "45" | "-45" | "90" | "-90" | "180";
  content?: {
    icon?: string;
    href?: string;
  }[];
}

export const Fab: React.FC<FabProps> = ({
  containerClassName,
  isOpen = false,
  rotation = "0",
  content,
  onClick,
  ...rest
}) => {
  const [Open, setOpen] = useState(isOpen);

  const RotationClasses =
    rotation === "0"
      ? "rotate-0"
      : rotation === "-45"
      ? "-rotate-45"
      : rotation === "-90"
      ? "-rotate-90"
      : rotation === "45"
      ? "rotate-45"
      : rotation === "90"
      ? "rotate-90"
      : rotation === "180" && "rotate-180";

  return (
    <div className={containerClassName}>
      <div className="relative w-14 h-14 flex justify-center items-center">
        <Button
          icon={`las la-plus la-2x transition ${
            Open ? "rotate-45" : "rotate-0"
          }`}
          className="p-3"
          rounded
          onClick={(e, setBusy) => {
            setOpen((prev) => (prev = !prev));
            onClick?.(e, setBusy);
          }}
          {...rest}
        />
        <div
          className={`absolute block h-14 w-14 -top-16 origin-[30px_93px] ${RotationClasses}`}
        >
          <div
            className={`absolute bottom-0 w-14 py-2 bg-white text-black text-3xl rounded-full shadow-md border transition ${
              Open ? "-translate-y-5 opacity-1" : "opacity-0"
            }`}
          >
            <div className="w-14 min-h-[52px] max-h-52 flex flex-col items-center overflow-y-auto no-scrollbar">
              {content?.map((v, i) => (
                <a
                  href={v.href}
                  key={i}
                  className="opacity-70 hover:opacity-100 my-2"
                >
                  <i
                    className={`${v.icon} ${
                      rotation === "180"
                        ? `rotate-${rotation}`
                        : `-rotate-${rotation}`
                    }`}
                  ></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
