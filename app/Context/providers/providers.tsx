"use client";
import { GlobalContextProvider } from "../global.context";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <GlobalContextProvider>{children}</GlobalContextProvider>;
};
