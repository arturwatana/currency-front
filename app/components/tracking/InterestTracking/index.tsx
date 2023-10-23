import { LastDaysQuery } from "@/app/interests/interest.interface";
import { apolloClient } from "@/app/utils/apollo.client";
import { formatCoin } from "@/app/utils/formatCoin";
import { gql } from "@apollo/client";
import { BsFillTrash3Fill } from "react-icons/bs";
import { toast } from "react-toastify";

interface InterestTrackProps {
    code: string
    codein: string
    name: string
    high: string
    low: string
    varBid: string
    lastDays: LastDaysQuery[]
    getLast15DaysInterests: () => {}
}




export default function InterestTracking({code,high,lastDays,low,name,varBid, codein,  getLast15DaysInterests}: InterestTrackProps){

    async function deleteInterest(){
        try {
          await apolloClient.mutate({
           mutation: gql`
             mutation deleteInterest($data: DeleteInterestDTO!){
                deleteInterest(data: $data){
                 username,
               }
             }
           `
           ,
            variables: {
               data: {
                interestName: code
               }
            }
          })
          toast.success("Interesse deletado com sucesso")
          getLast15DaysInterests()
        } catch(err: any){
            if (err.message === "Failed to fetch") {
                return "Ops, isso não foi possivel no momento";
              }
             return err.networkError.result.errors[0].message;
        }
      }


    const fortnightVariation = lastDays.reduce((acc, next) => {
       return  acc + parseFloat(next.pctChange)
    }, 0)
    const averageFornightPctChange = fortnightVariation / lastDays.length;

    const dailyVariation = ((+high - +low) / +low) * 100

    return (
        <li className="w-full bg-[#ddd] p-2 sm:p-1 border-[1px] sm:relative border-black text-black rounded-lg font-bold flex items-center justify-center sm:text-[12px]">
            <BsFillTrash3Fill className="text-red-600 font-bold text-[23px]  cursor-pointer sm:min-w-[20%] min-w-[10.28%] " onClick={deleteInterest}/>
            <ol className="w-full  flex justify-around text-center items-center ">
                <li className="min-w-[14.28%] max-w-[16%]  ">{`${code}/${codein}`}</li>
                <li className="min-w-[25.28%] sm:absolute sm:opacity-0 ">{name}</li>
                <li className="min-w-[14.28%] max-w-[16%] text-[#4CBB17] ">{formatCoin(+high, code)}</li>
                <li className="min-w-[14.28%] max-w-[16%] text-red-600 ">{formatCoin(+low, code)}</li>
                <li className={`min-w-[14.28%] max-w-[16%] ${dailyVariation >= 0 ? "text-[#4CBB17]" : "text-red-600" } `}>{dailyVariation >= 0 ? "+" : ""}{dailyVariation.toFixed(2)}%</li>
                <li className={`min-w-[14.28%] max-w-[16%] sm:absolute sm:opacity-0 ${averageFornightPctChange >= 0 ? "text-[#4CBB17]" : "text-red-600" } `}>{averageFornightPctChange >= 0 ? "+" : ""}{averageFornightPctChange.toFixed(2)}%</li>
            </ol>
        </li>
    )
}