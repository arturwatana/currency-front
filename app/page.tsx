"use client";
import { useState } from "react";
import { apolloClient } from "./utils/apollo.client";
import { gql } from "@apollo/client";
import { toast } from "react-toastify";
import Search from "./components/Search";
import { CurrencyTypeRes } from "./currency/model/currency.type";
import NavBar from "./components/navbar";
import Waves from "./components/Waves";
import { userRepository } from "./repositories";
import CurrencyTracking from "./components/tracking/CurrencyTracking";

export default function Home() {
  const [currency, setCurrency] = useState<string>("");
  const [result, setResult] = useState<CurrencyTypeRes>();
  const [lastSearchByName, setLastSearchByName] = useState<CurrencyTypeRes>();
  async function getLastSearchByName(name: string) {
    try {
      const result = await apolloClient.query({
        query: gql`
          query getLastSearchByName($name: String!) {
            getLastSearchByName(name: $name) {
              name
              high
              low
              create_date
            }
          }
        `,
        variables: {
          name: currency,
        },
      });
      setLastSearchByName(result.data.getLastSearchByName);
    } catch (err: any) {
      console.log(err)
      console.log(err.networkError.result.errors[0].message);
    }
  }

  async function sendCurrencyRequest() {
   const res = await userRepository.sendCurrencyRequest(currency)
   if(typeof res === "string"){
    toast(res)
    return
  }
  setResult(res)
  toast.success("Currency puxada com sucesso");
  }

  return (
    <main className="w-full h-full  min-h-screen relative flex  items-center  flex-col  bg-primaryGreen text-white overflow-x-hidden">
          <NavBar />
    <section className="flex flex-col items-center relative w-full h-full z-20 min-h-screen ">
    <div className="flex flex-col gap-10 items-center justify-center h-[70vh]">
      <div className="flex flex-col gap-5 items-center justify-start ">
        <h1 className="w-full text-center text-[22px] font-bold ">
          Pesquisar por uma moeda:
        </h1>
        <div className="flex gap-2">
          <input
            type="text"
            className="border-[1px] p-1 text-black rounded-md"
            onChange={(e: any) => setCurrency(e.target.value)}
            placeholder="Ex: USD"
          />
          <button
            className="border-[1px] rounded-md p-1 hover:bg-white hover:text-black hover:transition-colors"
            onClick={sendCurrencyRequest}
          >
            Pesquisar
          </button>
        </div>
          <p>Pesquise por uma moeda para começar a acompanha-la</p>
      </div>
      <div>
        {result ? (
          <Search
          id={result.id}
            code={result.code}
            create_date={result.create_date}
            high={result.high}
            low={result.low}
            name={result.name}
            index={1}
          />
        ) : null}
        </div>
      </div>
      <div className="absolute w-full bottom-0 ">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#222" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
         </div>
    </section>
      <section className=" w-full min-h-screen py-20 flex flex-col items-center gap-24  bg-[#222]">
      <div className="">
          <h2 className="font-bold text-center text-[40px]">Suas moedas trackeadas:</h2>
      </div>

      <ul className="rounded-lg w-[70%] bg-[#0074E4] p-4 text-black  gap-4 flex flex-col font-bold">
        <ol className="flex w-full justify-around text-center ">
          <li className="min-w-[10.28%] max-w-[15%]">Remover Interesse:</li>
          <li className="min-w-[14.28%] max-w-[15%]">Sigla:</li>
          <li className="min-w-[17.28%] max-w-[15%]">Nome:</li>
          <li className="min-w-[14.28%] max-w-[15%]">Alta</li>
          <li className="min-w-[14.28%] max-w-[15%]">Baixa</li>
          <li className="min-w-[14.28%] max-w-[15%]">Diario</li>
          <li className="min-w-[14.28%] max-w-[15%]">Ultimos 15 dias</li>
        </ol>
        <CurrencyTracking/>
        <CurrencyTracking/>
        <CurrencyTracking/>
        <CurrencyTracking/>
        <CurrencyTracking/>
        <CurrencyTracking/>
        <CurrencyTracking/>
      </ul>
        
      </section>
    </main>
  );
}
