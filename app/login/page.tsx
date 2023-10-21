"use client";
import Form from "../components/form";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../context/api/store";
import ImgWave from "../components/ImgWave";
import login from "../../assets/undraw_bitcoin_re_urgq.svg"
import BackPageBtn from "../components/BackPageBtn";
import { userRepository } from "../repositories";


type LoginRequestProps = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const [formInputs, setFormInputs] = useState<LoginRequestProps>({
    username: "",
    password: "",
  });
  const router = useRouter();
  const { loggedIn, setIsLoggedIn} = useGlobalContext();

  async function sendLoginRequest() {
    const loginRes = await userRepository.sendLoginRequest(formInputs)
    if(typeof loginRes === "string"){
      toast(loginRes)
      return
    }
    if(!loginRes.data){
      return
    }
    localStorage.setItem("user_token", loginRes.data.login.token);
    setIsLoggedIn(true)
    toast(`Logado com sucesso, seja bem vindo(a) ${loginRes.data.login.username}!`);
    router.push("/");
  }

  return (
    <main className="w-full h-full min-h-[100vh]  bg-primaryGreen flex items-center justify-center md:flex-col-reverse ">
      <BackPageBtn/>
      <div className="w-[55%] relative text-white flex flex-col gap-10 items-center border-2 min-h-[100vh] bg-[#222] border-neutral-600 justify-center md:w-full ">
      <div className="bg-primaryGreen  w-[80%] absolute h-[85%] rounded-full left-[85%] top-[8%] z-10 md:left-[5%] md:top-[-65%] md:w-[90%]"></div> 

      <div className="flex flex-col items-center justify-center gap-4 font-bold text-[22px] ">
      <h1 className="text-[35px]">CoinPulse</h1>
      <h3 className="font-light text-[20px]">Seu aplicativo de consultas</h3>
      </div>
      <ImgWave width="55%" img={login}/>
      </div>
      <div className="w-[45%] h-full min-h-screen z-20 flex items-center justify-center md:w-full md:px-10 ">
      <Form
        nameOfInputs={["Usuário: ", "Senha: "]}
        typeOfInputs={["text", "password"]}
        formAction="Login"
        formInputs={formInputs}
        updateFormProps={setFormInputs}
        actionButton={sendLoginRequest}
        formSecondAction="Ainda não possui uma conta? Registre-se"
        formSecondActionURl="/register"
      />

        </div>
    </main>
  );
}
