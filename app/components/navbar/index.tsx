"use client";
import { useGlobalContext } from "@/app/context/api/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {CiMenuBurger} from "react-icons/ci"

export default function NavBar() {

  const { loggedIn} = useGlobalContext();
  const [rotateBurger, setRotateBurger] = useState<boolean>(false)
  const router = useRouter();

  function removeToken() {
    localStorage.removeItem("user_token");
    router.push("/login");
  }


  return (
    <nav className=" w-[70%] flex justify-between text-lg mt-16 text-white ">
      <a href="/" className="font-bold text-[35px] text-white" >CoinPulse</a>
      <div className="relative   ">
      <CiMenuBurger className={`${rotateBurger ? "animate-rotate180" : ""} text-[30px] mb-2 `} onClick={() => setRotateBurger(prev => !prev)}/>
      {rotateBurger ? (
        <ul className="flex flex-col gap-5 absolute text-white bg-primaryGreen border-[2px] border-white p-4 items-center justify-center  text-center rounded-lg  z-50 left-[-3em] botton-0">
        <a href="/">Home</a>
        {loggedIn ? (
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
      ) : null}
      </div>
    </nav>
  );
}
