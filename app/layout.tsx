"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "./components/navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContext, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

type AppContext = {
  userIsLogged: boolean;
  setUserIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreatedContext = createContext<AppContext>({
  userIsLogged: false,
  setUserIsLogged: () => {},
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userIsLogged, setUserIsLogged] = useState<boolean>(false);

  const contextValues = {
    userIsLogged,
    setUserIsLogged,
  };

  return (
    <CreatedContext.Provider value={contextValues}>
      <html lang="en">
        <body className={inter.className}>
          <NavBar />
          <ToastContainer />
          {children}
        </body>
      </html>
    </CreatedContext.Provider>
  );
}
