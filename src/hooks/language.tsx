import { FC, createContext, useContext, useState, useEffect } from "react";
import { Storage } from "@capacitor/storage";

// Create Context
const DefaultLanguage = "en";
const LanguageContext = createContext(DefaultLanguage);
const SetLanguageContext = createContext(
  null as unknown as (language: string) => void
);

// Use Context
export const useLanguage = () =>
  [useContext(LanguageContext), useContext(SetLanguageContext)] as const;

// Context Provider
export const LanguageProvider: FC = ({ children }) => {
  // Set State
  const [state, setState] = useState(useLanguage());

  useEffect(() => {
    const Mounted = { current: true };

    (async () => {
      // Get Language From Storage
      const Language =
        (await Storage.get({ key: "Language" })).value || DefaultLanguage;

      // Set Current Language
      if (Mounted.current) setState((state) => [Language, state[1]]);
    })();

    return () => {
      Mounted.current = false;
    };
  }, []);

  useEffect(() => {
    const HTMLTag = document.querySelector("html");
    if (HTMLTag) HTMLTag.lang = state[0];
  }, [state[0]]);

  const setLanguage = (language: string) => {
    Storage.set({ key: "Language", value: language });
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
