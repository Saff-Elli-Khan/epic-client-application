import { FC, createContext, useContext, useState, useEffect } from "react";
import { Storage } from "@capacitor/storage";

// Create Context
const DefaultCurrency = "usd";
const CurrencyContext = createContext(DefaultCurrency);
const SetCurrencyContext = createContext(
  null as unknown as (currency: string) => void
);

// Use Context
export const useCurrency = () =>
  [useContext(CurrencyContext), useContext(SetCurrencyContext)] as const;

// Context Provider
export const CurrencyProvider: FC = ({ children }) => {
  // Set State
  const [state, setState] = useState(useCurrency());

  useEffect(() => {
    const Mounted = { current: true };

    (async () => {
      // Get Currency From Storage
      const Currency =
        (await Storage.get({ key: "Currency" })).value || DefaultCurrency;

      // Set Current Currency
      if (Mounted.current) setState((state) => [Currency, state[1]]);
    })();

    () => {
      Mounted.current = false;
    };
  }, []);

  const setCurrency = (currency: string) => {
    Storage.set({ key: "Currency", value: currency });
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
