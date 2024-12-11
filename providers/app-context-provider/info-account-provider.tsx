"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface IContext {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}

const InfoAccountProvider = createContext<IContext>({
  activeTab: "account",
  setActiveTab: () => {},
});

export const useInfoAccountContext = () => {
  const context = useContext(InfoAccountProvider);
  return context;
};

export default function InfoAccountContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState<string>("account");

  return (
    <InfoAccountProvider.Provider
      value={{
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </InfoAccountProvider.Provider>
  );
}
