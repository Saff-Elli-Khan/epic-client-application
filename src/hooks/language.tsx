import { FC, createContext, useContext, useState, useEffect } from "react";
import { getStorageItem, setStorageItem } from "../lib/storage";

// Create Context
const DefaultLanguage = getStorageItem("Language") || "en";
const LanguageContext = createContext(DefaultLanguage);
const SetLanguageContext = createContext(
  (null as unknown) as (language: string) => void
);

// Use Context
export const useLanguage = () =>
  [useContext(LanguageContext), useContext(SetLanguageContext)] as const;

// Context Provider
export const LanguageProvider: FC = ({ children }) => {
  // Set State
  const [state, setState] = useState(useLanguage());

  useEffect(() => {
    // Get Language From Storage
    setState((state) => [
      getStorageItem("Language") || DefaultLanguage,
      state[1],
    ]);
  }, []);

  useEffect(() => {
    const HTMLTag = document.querySelector("html");
    if (HTMLTag) HTMLTag.lang = state[0];
  }, [state[0]]);

  const setLanguage = (language: string) => {
    setStorageItem("Language", language);
    setState((state) => [language, state[1]]);
  };

  return (
    <LanguageContext.Provider value={state[0]}>
      <SetLanguageContext.Provider value={setLanguage}>
        {children}
      </SetLanguageContext.Provider>
    </LanguageContext.Provider>
  );
};
