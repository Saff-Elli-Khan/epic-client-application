import { FC, createContext, useContext, useState, useEffect } from "react";
import { getStorageItem, setStorageItem } from "../lib/storage";

export type LayoutType = "ltr" | "rtl";

// Create Context
const DefaultLayout = (getStorageItem("Layout") as LayoutType) || "ltr";
const LayoutContext = createContext<LayoutType>(DefaultLayout);
const SetLayoutContext = createContext(
  (null as unknown) as (layout: LayoutType) => void
);

// Use Context
export const useLayout = () =>
  [useContext(LayoutContext), useContext(SetLayoutContext)] as const;

// Context Provider
export const LayoutProvider: FC = ({ children }) => {
  // Set State
  const [state, setState] = useState(useLayout());

  useEffect(() => {
    // Get Layout From Storage
    setState((state) => [
      (getStorageItem("Layout") || DefaultLayout) as LayoutType,
      state[1],
    ]);
  }, []);

  useEffect(() => {
    const HTMLTag = document.querySelector("html");
    if (HTMLTag) HTMLTag.dir = state[0];
  }, [state[0]]);

  const setLayout = (layout: LayoutType) => {
    setStorageItem("Layout", layout);
    setState((state) => [layout, state[1]]);
  };

  return (
    <LayoutContext.Provider value={state[0]}>
      <SetLayoutContext.Provider value={setLayout}>
        {children}
      </SetLayoutContext.Provider>
    </LayoutContext.Provider>
  );
};
