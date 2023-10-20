"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Search from "./components/Search";
import { CurrencyTypeRes } from "./currency/model/currency.type";
import NavBar from "./components/navbar";
import Waves from "./components/Waves";
import { userRepository } from "./repositories";
import InterestTracking from "./components/tracking/InterestTracking";
import { Last15DaysFromInterest } from "./interests/interest.interface";

export default function Home() {
  const [currency, setCurrency] = useState<string>("");
  const [result, setResult] = useState<CurrencyTypeRes>();
  const [last15DaysFromInterests, setLast15DaysFromInterests] = useState<Last15DaysFromInterest[]>([])
  const [queryByPeriod, setQueryByPeriod] = useState(false)

  async function sendCurrencyRequest() {
    if(currency.length === 0){
      toast.error("Ops, ficou faltando dizer qual moeda pesquisar")
      return
    }
   const res = await userRepository.sendCurrencyRequest(currency)
   if(typeof res === "string"){
    toast(res)
    return
  }
  setResult(res)
  const currencyAlreadyInInterests = last15DaysFromInterests.find(interest => interest.code === currency)
  getLast15DaysInterests()
if(currencyAlreadyInInterests){
  toast.success("Moeda consultada com sucesso")
  return
}
  toast.success("Interesse adicionado com sucesso");
  }

  async function getLast15DaysInterests(){
    const res = await userRepository.getLast15DaysFromInterests()
    if(typeof res === "string"){
     toast(res)
     return
   }
   setLast15DaysFromInterests(res)
  }



  useEffect(() => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    getLast15DaysInterests()
  }, [])

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
            onChange={(e: any) => {
              setCurrency(e.target.value)}}
            placeholder="Ex: USD"
          />
          
        </div>
        <div className="flex gap-4">
        <label htmlFor="period">Pesquisar por periodo</label>
        <input type="checkbox" name="period" id="" onChange={(e) => setQueryByPeriod(prev => !prev)} />
        </div>
        {queryByPeriod ? (
          <div className="flex gap-2 text-black items-center justify-center">
            <label htmlFor="start" className="text-white">Data de inicio:</label>
            <input type="date" name="start" id="" className="p-1 rounded-md" />
            <label htmlFor="end" className="text-white">Data de termino:</label>
            <input type="date" name="end" id="" className="p-1 rounded-md"  />
          </div> 
        ) : null}

<button
            className="border-[1px] rounded-md p-1 hover:bg-white hover:text-black hover:transition-colors"
            onClick={sendCurrencyRequest}
          >
            Pesquisar
          </button>
        
          <p>Pesquise por uma moeda para adiciona-la em seus interesses e começar a acompanha-la</p>
      </div>
      <div className="   ">
        {result ? (
          <Search
          id={result.id}
            code={result.code}
            create_date={result.create_date}
            high={result.high}
            low={result.low}
            name={result.name}
            index={0}
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
        <ol className="flex w-full justify-around text-center items-center p-2  ">
          <li className="min-w-[10.28%] max-w-[15%]">Remover Interesse:</li>
          <li className="min-w-[14.28%] max-w-[13%]">Sigla:</li>
          <li className="min-w-[22.28%] ">Cambio:</li>
          <li className="min-w-[13.28%] max-w-[13%]">Alta</li>
          <li className="min-w-[13.28%] max-w-[13%]">Baixa</li>
          <li className="min-w-[13.28%] max-w-[13%]">Diario</li>
          <li className="min-w-[13.28%] max-w-[13%]">Ultimos 15 dias</li>
        </ol>
        {
          last15DaysFromInterests ? (
            last15DaysFromInterests.map((interest, index) => <InterestTracking getLast15DaysInterests={getLast15DaysInterests} code={interest.code} high={interest.high} lastDays={interest.lastDays} low={interest.low} name={interest.name} varBid={interest.varBid} key={`interest${index}`}/>)
            ) : <li className="text-white">Loading</li>
        }
      </ul>
        
      </section>
    </main>
  );
}
