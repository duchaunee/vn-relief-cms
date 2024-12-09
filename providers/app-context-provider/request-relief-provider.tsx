"use client";

import { Dispatch, createContext, useContext, useState } from "react";

interface IContext {
  open: boolean;
  setOpen: (value: React.SetStateAction<boolean>) => void;
}

const RequestReliefProvider = createContext<IContext>({
  open: false,
  setOpen: () => {},
});

export const useRequestReliefContext = () => {
  const context = useContext(RequestReliefProvider);
  return context;
};

export default function RequestReliefContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <RequestReliefProvider.Provider
      value={{
        open,
        setOpen,
      }}
    >
      {children}
    </RequestReliefProvider.Provider>
  );
}
