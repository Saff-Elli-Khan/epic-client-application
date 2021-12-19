import { FC, createContext, useContext, useState, useEffect } from "react";
import { getStorageItem, setStorageItem } from "../lib/storage";

// Create Context
const DefaultCurrency = "en";
const CurrencyContext = createContext(DefaultCurrency);
const SetCurrencyContext = createContext(
  (null as unknown) as (currency: string) => void
);

// Use Context
export const useCurrency = () =>
  [useContext(CurrencyContext), useContext(SetCurrencyContext)] as const;

// Context Provider
export const CurrencyProvider: FC = ({ children }) => {
  // Set State
  const [state, setState] = useState(useCurrency());

  useEffect(() => {
    // Get Currency From Storage
    setState((state) => [
      getStorageItem("Currency") || DefaultCurrency,
      state[1],
    ]);
  }, []);

  const setCurrency = (currency: string) => {
    setStorageItem("Currency", currency);
    setState((state) => [currency, state[1]]);
  };

  return (
    <CurrencyContext.Provider value={state[0]}>
      <SetCurrencyContext.Provider value={setCurrency}>
        {children}
      </SetCurrencyContext.Provider>
    </CurrencyContext.Provider>
  );
};
