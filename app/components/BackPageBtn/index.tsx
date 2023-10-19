
import {BiArrowBack} from "react-icons/bi"
import {useState} from "react"
import { useRouter } from "next/navigation";


export default function BackPageBtn(){
    const [hover, setHover] = useState<boolean>(false)
  const router = useRouter();

    function redirectUser(){
      router.push("/");
    }
    return (
        <button className="absolute z-30 text-white top-10 left-1/4 border-[1px] transition-all min-w-[8em] rounded-full p-2 min-h-[3em] flex items-center justify-center" onClick={redirectUser } onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>{hover ? "Voltar" : <BiArrowBack />}</button>
    )
}