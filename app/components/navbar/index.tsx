"use client";
import { useGlobalContext } from "@/app/Context/global.context";
import { useEffect, useState } from "react";

export default function NavBar() {
  const { userIsLogged } = useGlobalContext();
  const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("user_token");
    if (!token) {
      return;
    }
    setUserIsLoggedIn(true);
  }, []);

  function removeToken() {
    localStorage.removeItem("user_token");
  }

  return (
    <nav className="relative w-[70%] flex justify-between text-lg ">
      <p className="font-bold text-[35px] text-white">CoinPulse</p>
      <ul className="flex gap-5 text-white">
        <a href="/">Home</a>
        {userIsLoggedIn ? (
          <>
            <a href="/searches"> Minhas pesquisas</a>
            <a href="" onClick={removeToken}>
              Logout
            </a>
          </>
        ) : (
          <>
            <a href="/login">Login</a>
            <a href="/register">Registrar</a>
          </>
        )}
      </ul>
    </nav>
  );
}
