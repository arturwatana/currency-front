import { BsFillTrash3Fill } from "react-icons/bs";




export default function CurrencyTracking(){
    return (
        <li className="w-full bg-[#ddd] p-2 border-[1px] border-black text-black rounded-lg font-bold flex items-center ">
            <BsFillTrash3Fill className="text-red-600 font-bold text-[23px] cursor-pointer min-w-[10.28%]"/>
            <ol className="w-full  flex justify-around text-center items-center">
                <li className="min-w-[12.28%] ">USD</li>
                <li className="min-w-[12.28%] max-w-[20%]">Dólar Americano/Real Brasileiro</li>
                <li className="min-w-[12.28%]  text-[#4CBB17]">R$5.02</li>
                <li className="min-w-[12.28%] text-red-600 ">R$5.02</li>
                <li className="min-w-[12.28%] text-red-600 ">-02.35%</li>
                <li className="min-w-[12.28%] text-[#4CBB17]">+65%</li>
            </ol>
        </li>
    )
}