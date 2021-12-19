import { FC, createContext, useContext, useState, useEffect } from "react";
import { Requests } from "../lib/requests";

export interface APIDetails {
  name: string;
  description: string;
  brand: {
    name: string;
    country: string;
    address: string;
  };
  [key: string]: any;
}

export const APIDetailsContext = createContext<APIDetails | null>(null);

export const useAPIDetails = () => useContext(APIDetailsContext);

export const APIDetailsProvider: FC = ({ children }) => {
  const [State, setState] = useState<APIDetails | null>(null);

  useEffect(() => {
    const Mounted = { current: true };

    (async () => {
      // Fetch API Details
      const APIDetails = await new Requests().get<APIDetails>("/");

      // Store API Details
      if (Mounted.current && APIDetails.status) setState(APIDetails.data);
    })();

    return () => {
      Mounted.current = false;
    };
  }, []);

  return (
    <APIDetailsContext.Provider value={State}>
      {children}
    </APIDetailsContext.Provider>
  );
};
