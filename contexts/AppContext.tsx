import { ReactNode, createContext, useContext, useState } from "react";
import { Tenant } from "../Types/Tenant"


type appContextType = {
  tenant: Tenant | null;
  setTenant: (newTenant: Tenant) => void;
}

const defultValues: appContextType = {
  tenant: null,
  setTenant: () => null
}

const appContext = createContext<appContextType>(defultValues);

export const useAppContext = () => useContext(appContext);


type Props = {
  children: ReactNode;
}
export const AppContextProvider = ({ children }: Props) => {

  const [tenant, setTenant] = useState<Tenant | null>(null);
  return (
    <appContext.Provider value={{ tenant, setTenant }} >
      {children}
    </appContext.Provider >
  );
}