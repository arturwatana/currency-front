"use client";
import { useGlobalContext } from "@/app/context/api/store";
import { useRouter } from "next/navigation";
import {  useState } from "react";
import {CiMenuBurger} from "react-icons/ci"
import Notification from "../Notification";

export default function NavBar() {

  const { loggedIn} = useGlobalContext();
  const [rotateBurger, setRotateBurger] = useState<boolean>(false)
  const router = useRouter();

  function removeToken() {
    localStorage.removeItem("user_token");
    router.push("/login");
  }


  return (
    <header className=" w-[70%] flex justify-between text-lg text-white lg:w-[80%] absolute top-10  z-30 items-center">
      <a href="/" className="font-bold text-[35px] text-white md:text-[25px]" >CoinPulse</a>
      <nav className="relative flex gap-24 md:gap-10 ">

      <Notification/>
        <div className="relative">
        <CiMenuBurger className={`${rotateBurger ? "animate-rotate180" : ""} text-[30px] mb-2 `} onClick={() => setRotateBurger(prev => !prev)}/>
      {rotateBurger ? (
        <ul className="flex flex-col gap-5 absolute text-white bg-[#222] border-[2px] border-white p-4 items-center justify-center  text-center rounded-lg  z-50 left-[-3em] botton-0">
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
    </header>
  );
}
