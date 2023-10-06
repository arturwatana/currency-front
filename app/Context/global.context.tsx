"use client";

import { createContext, useContext, useEffect, useState } from "react";

type AppContext = {
  userIsLogged: boolean;
  setUserIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreatedContext = createContext<AppContext>({
  userIsLogged: false,
  setUserIsLogged: () => {},
});

export const GlobalContextProvider = ({ children }: any) => {
  const [userIsLogged, setUserIsLogged] = useState<boolean>(false);
  useEffect(() => {
    console.log(userIsLogged);
  }, [userIsLogged]);

  return (
    <CreatedContext.Provider value={{ userIsLogged, setUserIsLogged }}>
      {children}
    </CreatedContext.Provider>
  );
};

export const useGlobalContext = () => useContext(CreatedContext);
