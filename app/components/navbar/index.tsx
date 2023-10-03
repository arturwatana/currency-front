import { CreatedContext } from "@/app/layout";
import { useContext } from "react";

export default function NavBar() {
  const { userIsLogged } = useContext(CreatedContext);
  return (
    <nav className="absolute w-[80%] flex justify-end mt-[3em] ">
      <ul className="flex gap-5 text-white">
        <a href="/">Home</a>
        {userIsLogged ? (
          <a href="/searches"> Minhas pesquisas</a>
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
