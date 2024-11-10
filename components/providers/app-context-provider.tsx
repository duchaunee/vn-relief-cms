"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface IContext {}

const AppContext = createContext<IContext>({});

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
}
