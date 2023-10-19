"use client";
import { useGlobalContext } from "@/app/context/api/store";
import { useRouter } from "next/navigation";

export default function NavBar() {

  const { loggedIn} = useGlobalContext();
  const router = useRouter();

  function removeToken() {
    localStorage.removeItem("user_token");
    router.push("/login");
  }


  return (
    <nav className=" w-[70%] flex justify-between text-lg mt-16 ">
      <p className="font-bold text-[35px] text-white">CoinPulse</p>
      <ul className="flex gap-5 text-white">
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
    </nav>
  );
}
