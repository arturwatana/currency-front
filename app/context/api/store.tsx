
'use client';

import { createContext, useContext, Dispatch, SetStateAction, useState, useEffect } from "react";


interface ContextProps {
    loggedIn: boolean,
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>,
    updateScreen: boolean
    setUpdateScreen: React.Dispatch<React.SetStateAction<boolean>>
}

const GlobalContext = createContext<ContextProps>({
    loggedIn: false,
    setIsLoggedIn: () => {},
    updateScreen: false,
    setUpdateScreen: ()=>{}
})

export const GlobalContextProvider = ({ children }: {children: React.ReactNode}) => {
    const [loggedIn, setIsLoggedIn] = useState(false);
     const [updateScreen, setUpdateScreen] = useState<boolean>(false);

     const contextValues = {
        loggedIn,
        setIsLoggedIn,
        updateScreen,
        setUpdateScreen
     }

    useEffect(() => {
        const token = localStorage.getItem("user_token");
        if (!token) {
          return;
        }
        setIsLoggedIn(true)
      }, [loggedIn]);
    
    return (
        <GlobalContext.Provider value={contextValues}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);