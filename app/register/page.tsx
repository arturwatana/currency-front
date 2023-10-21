"use client";
import Form from "../components/form";
import { useState } from "react";
import { apolloClient } from "../utils/apollo.client";
import { gql } from "@apollo/client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import register from "../../assets/undraw_crypto_flowers_re_dyqo.svg"
import ImgWave from "../components/ImgWave";
import BackPageBtn from "../components/BackPageBtn";
import { userRepository } from "../repositories";

type RegisterRequestProps = {
  username: string;
  email?: string;
  password: string;
};

export default function RegisterPage() {
  const [formInputs, setFormInputs] = useState<RegisterRequestProps>({
    username: "",
    password: "",
    email: "",
  });
  const router = useRouter();

  async function sendRegisterRequest() {
      const registerRes = await userRepository.sendRegisterRequest(formInputs)
      if(typeof registerRes === "string"){
        toast(registerRes)
        return
      }
      toast("Usuário cadastrado com sucesso");
      router.push("/login");
  }

  return (
    <main className="w-full h-full min-h-screen bg-primaryGreen flex md:flex-col-reverse  ">
      
        <BackPageBtn/>
      <div className="w-[55%] relative  flex flex-col gap-10 items-center justify-center h-screen bg-[#222] md:w-full md:h-full md:py-10">
      <div className="bg-primaryGreen  w-[80%] absolute h-[85%] rounded-full left-[85%] top-[8%] z-10 md:left-[5%] md:top-[-65%] md:w-[90%]"></div> 
      <div className="h-[70%] flex items-center justify-center flex-col gap-8 relative 2xl:w-[70%] md:w-[90%] ">
        <div className="text-white text-center flex flex-col gap-3 text-[14px] lg:w-[90%] md:pt-44   ">
        <h1 className="font-bold text-[22px]">Consulte suas moedas favoritas</h1>
        <p className="">Bem-vindo ao CoinPulse! Comece agora a consultar o valor de suas moedas preferidas, incluindo valores antigos e históricos.</p>
        <h2 className="text-[22px] font-bold">Registro Rápido e Fácil</h2>
        <div className="w-full flex items-center justify-center">
        <ol className="list-decimal w-[50%] lg:w-full lg:gap-2">
          <li>
            <p><span className="font-bold" >Crie uma Conta: </span>Preencha seus detalhes básicos para começar.</p>
          </li>
          <li>
            <p><span className="font-bold">Adicione Suas Moedas: </span>Escolha suas criptomoedas favoritas para rastrear.</p>
          </li>
          <li>
          <p><span className="font-bold">Acesse Valores Antigos: </span>Consulte os valores passados e históricos de suas moedas.</p>
          </li>
        </ol>

        </div>

        <h3 className="font-bold text-[22px]">Não perca tempo, comece agora!</h3>
        <p>Registre-se e explore o mundo das criptomoedas com o CoinPulse. <span className="font-bold">É fácil e gratuito!</span> </p>
        </div>
    <div className="flex items-center justify-center lg:opacity-0 lg:absolute md:opacity-100 md:relative ">
        <ImgWave width="50%" img={register}/>
    </div>
      </div>

      </div>
      <div className="w-[45%] h-full min-h-screen z-20 flex items-center justify-center md:w-full md:px-10">
      <Form
        nameOfInputs={["Usuário: ", "Email: ", "Senha: "]}
        typeOfInputs={["text", "text", "password"]}
        formAction="Registrar"
        formInputs={formInputs}
        updateFormProps={setFormInputs}
        actionButton={sendRegisterRequest}
        formSecondAction="Já tem uma conta? Faca o Login"
        formSecondActionURl="/login"
      />
      </div>
    </main>
  );
}
