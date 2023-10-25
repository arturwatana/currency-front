"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Search from "./components/Search";
import { CurrencyTypeRes } from "./currency/model/currency.type";
import NavBar from "./components/navbar";
import { userRepository } from "./repositories";
import InterestTracking from "./components/tracking/InterestTracking";
import { Last15DaysFromInterest } from "./interests/interest.interface";
import { useRouter } from "next/navigation";
import Footer from "./components/Footer";

interface CurrencyProps {
  from: string
  to: string
}
interface PeriodProps {
  startAt: string
  endAt: string
}


export default function Home() {
  const [currency, setCurrency] = useState<CurrencyProps>({
    from: "",
    to: "BRL"
  })
  const [periodProps, setPeriodProps] = useState<PeriodProps>({
    startAt: "",
    endAt: ""
  })
  const [result, setResult] = useState<CurrencyTypeRes>();
  const [last15DaysFromInterests, setLast15DaysFromInterests] = useState<Last15DaysFromInterest[]>([])
  const [queryByPeriod, setQueryByPeriod] = useState(false)
  const router = useRouter();

    function validateDate(start: string, end: string){
      if(!start || !end){
        return null
      }  
      return "ok"
    }
  async function sendCurrencyRequest() {
    if(currency.from.length === 0){
      toast.error("Ops, ficou faltando dizer qual moeda pesquisar")
      return
    }
    let res
    if(queryByPeriod){
      const validate = validateDate(periodProps.startAt, periodProps.endAt)
      if(validate != "ok"){
      return
    }
    const dataReq = {
      from: currency.from,
      to: currency.to,
      startAt: periodProps.startAt,
      endAt: periodProps.endAt
    }
    res = await userRepository.sendPeriodCurrentRequest(dataReq)
   } else {
     res = await userRepository.sendCurrencyRequest(currency.from, currency.to)
   }
   if(typeof res === "string"){
    toast.error(res)
    return
  }
  setResult(res)
  const currencyAlreadyInInterests = last15DaysFromInterests.find(interest => {
    if(interest.code.toLowerCase() === currency.from.toLowerCase() && interest.codein.toLowerCase() === currency.to.toLowerCase()) return interest
  })
  getLast15DaysInterests()
if(currencyAlreadyInInterests){
  toast.success("Moeda consultada com sucesso")
  return
}
  toast.success("Interesse adicionado com sucesso");
  }

  function sortElements(elements: Last15DaysFromInterest[]){
    const elementsCopy = [...elements];
    const sorted = elementsCopy.sort((prev, next) => {
      const prevVariation = ((+prev.high - +prev.low) / +prev.low) * 100
      const nextVariation = ((+next.high - +next.low) / +next.low) * 100
      return +nextVariation - +prevVariation;
    });
    return sorted
  }

  async function getLast15DaysInterests(){
    const res = await userRepository.getLast15DaysFromInterests()
    if(typeof res === "string"){
      if(res === "Ops, preciso que faca o login novamente"){
      }
     toast.error(res)
     return
   }
   setLast15DaysFromInterests(res)
   sortElements(res)
  }

  useEffect(() => {
    const token = localStorage.getItem("user_token")
    if(!token){
      router.push("/login");
      return
    }
    getLast15DaysInterests()
  },[])


  return (
    <main className="w-full h-full  min-h-screen relative flex  items-center  flex-col  bg-[#222] text-white overflow-x-hidden">
          <NavBar />
    <section className="flex flex-col items-center relative w-full h-full z-20 min-h-screen md:justify-center ">
    <div className="flex flex-col gap-10 items-center justify-center min-h-[70vh] h-full md:h-[80vh]">
      <div className="flex flex-col gap-5 items-center justify-center  ">
        <h1 className="w-full text-center text-[22px] font-bold ">
          Pesquisar por uma moeda:
        </h1>
        <div className="flex gap-2 items-center justify-center md:flex-col md:gap-4">
          <div className="flex gap-2 items-center justify-center">
          <label htmlFor="from" className="md:min-w-[15%]">De:</label>
          <input
            type="text"
            className="border-[1px] p-1 text-black rounded-md"
            onChange={(e: any) => {
              setCurrency(prev => {
                return {
                  ...prev,
                  from: e.target.value.replaceAll(" ", "")
                }
              })}}
            placeholder="Ex: USD"
            name="from"
          />
          </div>
          <div className="flex gap-2 items-center justify-center">

          <label htmlFor="to">Para:</label>
          <input
            type="text"
            className="border-[1px] p-1 text-black rounded-md"
            onChange={(e: any) => {
              setCurrency(prev => {
                return {
                  ...prev,
                  to: e.target.value.replaceAll(" ", "")
                }
              })}}
            placeholder="Ex: USD"
            name="to"
          />
          </div>
          
        </div>
        <div className="flex gap-4">
        <label htmlFor="period" className="font-bold">Pesquisar por periodo:</label>
        <input type="checkbox" name="period" id="" className="cursor-pointer w-[18px]" onChange={(e) => setQueryByPeriod(prev => !prev)} />
        </div>
        {queryByPeriod ? (
          <div className="flex gap-2 text-black items-center justify-center md:flex-col">
            <label htmlFor="start" className="text-white">Data de inicio:</label>
            <input type="date" name="start" id="" className="p-1 rounded-md" onChange={(e) => setPeriodProps(prev => {
             return {
              ...prev,
              startAt: e.target.value.split("-").join("")
             }
            })} />
            <label htmlFor="end" className="text-white">Data de termino:</label>
            <input type="date" name="end" id="" className="p-1 rounded-md" onChange={(e) => setPeriodProps(prev => {
             return {
              ...prev,
              endAt: e.target.value.split("-").join("")
             }
            })} />
          </div> 
        ) : null}

<button
            className="border-[1px] rounded-md p-1 hover:bg-white hover:text-black hover:transition-colors"
            onClick={sendCurrencyRequest}
          >
            Pesquisar
          </button>
        
          <p className="w-full text-center px-5 md:w-[70%]">Pesquise por uma moeda para adiciona-la em seus interesses e começar a acompanha-la</p>
      </div>
      <div className="z-40">
        {result ? (
          <Search
          id={result.id}
          name={result.name}
            code={result.code}
            create_date={result.create_date}
            high={result.high}
            low={result.low}
            from={result.from}
            to={result.to}
            index={0}
          />
        ) : null}
        </div>
      </div>
      <div className="absolute w-full bottom-[-3px]  ">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#F2A900" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
         </div>
    </section>
      <section className=" w-full min-h-screen py-20 flex flex-col items-center gap-24  bg-[#F2A900]">
      <div className="">
          <h2 className="font-bold text-center text-[40px] md:text-[25px] text-white">Suas moedas trackeadas:</h2>
      </div>
      <div className="w-[80%] flex flex-col gap-2 lg:w-[100%] px-4">
      <p className="w-full text-center text-white">Suas moedas serão ordenadas por variação diária.</p>
      <ul className="rounded-lg  bg-[#222] p-2 sm:p-1 text-black  gap-4 flex flex-col font-bold">
        <ol className="flex w-full justify-around sm:relative text-center items-center text-black p-2 border-[1px] bg-[#ddd] rounded-lg border-[#222] sm:text-[12px] ">
          <li className="min-w-[10.28%] max-w-[15%]">Remover</li>
          <li className="min-w-[14.28%] max-w-[13%]">Sigla</li>
          <li className="min-w-[22.28%] sm:absolute sm:opacity-0 ">Cambio</li>
          <li className="min-w-[13.28%] max-w-[13%]">Alta</li>
          <li className="min-w-[13.28%] max-w-[13%]">Baixa</li>
          <li className="min-w-[13.28%] max-w-[13%]">Diário</li>
          <li className="min-w-[13.28%] max-w-[13%] sm:absolute sm:opacity-0 ">Últimos 15 dias</li>
        </ol>
        {
          last15DaysFromInterests ? (
            sortElements(last15DaysFromInterests).map((interest, index) => <InterestTracking getLast15DaysInterests={getLast15DaysInterests} codein={interest.codein}  code={interest.code} high={interest.high} lastDays={interest.lastDays} low={interest.low} name={interest.name} varBid={interest.varBid} key={`interest${index}`}/>)
            ) : <li className="text-white">Loading</li>
        }
      </ul>
      </div>
      <Footer/>
        
      </section>
    </main>
  );
}
