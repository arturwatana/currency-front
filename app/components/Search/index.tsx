import { CurrencyType, CurrencyTypeRes } from "@/app/currency/model/currency.type";
import { apolloClient } from "@/app/utils/apollo.client";
import { formatCoin } from "@/app/utils/formatCoin";
import { gql } from "@apollo/client";
import {BsFillTrash3Fill} from "react-icons/bs"
import { toast } from "react-toastify";
type SearchComponentProps = {
  index: number;
  setDeleteSearchId?: React.Dispatch<React.SetStateAction<string>>
} & CurrencyTypeRes;

export default function Search({
  create_date,
  high,
  low,
  name,
  index,
  id,
  setDeleteSearchId
}: SearchComponentProps) {


  async function deleteSearch(){
    try {
      await apolloClient.mutate({
       mutation: gql`
         mutation deleteCurrency($currencyId: String!){
           deleteCurrency(currencyId: $currencyId){
             username,
           }
         }
       `
       ,
        variables: {
           currencyId: id
        }
      })
      toast.success("Search deletada com sucesso")
      if(setDeleteSearchId){
        setDeleteSearchId(id)
      }
      
    } catch(err: any){
      if (err.message === "Failed to fetch") {
        toast.error("Ops, isso não foi possivel no momento")
        return
      }
     toast.error(err.networkError.result.errors[0].message)
    }
  }
  return (
    <div
      key={index}
      className="w-[22em]  bg-slate-200 shadow-md shadow-slate-900  text-[#333333] p-2 rounded-md minMd:hover:m-3 minMd:hover:scale-125 transition-all"
    >
      <div className="w-full flex justify-between">
      <h1 className="font-bold">Consulta nº: {index + 1}</h1>
      <BsFillTrash3Fill className="text-red-600 font-bold text-[17px] cursor-pointer" onClick={deleteSearch}/>
      </div>
      <h1 className="font-bold">Nome: {name}</h1>
      <p className=" font-bold">
        Valor mais alto:
        <span className="text-[#4CBB17] font-bold">{formatCoin(+high)}</span>
      </p>
      <p className=" font-bold">
        Valor mais baixo:
        <span className="text-[#FF4500]">{formatCoin(+low)}</span>
      </p>
      <p className=" font-bold">
        Data da consulta: <span className="text-[#666666] ">{create_date}</span>{" "}
      </p>
    </div>
  );
}
