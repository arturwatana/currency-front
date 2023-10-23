
import {AiOutlineGithub} from "react-icons/ai"


export default function Footer(){
    return (
        <footer className="absolute bottom-0 min-h-[2.5em] text-white w-full flex items-center justify-center bg-[#222] gap-4">
            <p>Coinpulse</p>
            <a href="https://github.com/arturwatana" target="_blank">
            <AiOutlineGithub className="text-[22px]"/>
            </a>
        </footer>
        )
}