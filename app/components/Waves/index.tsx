
interface WavesProps {
    primaryColor?: string
    secondColor?: string
}

export default function Waves({primaryColor,secondColor}: WavesProps){
    return (
        <div className="absolute w-full top-[40%] z-10">
             <div className="w-[30em] h-[30em] bg-[#222] right-[82%] rounded-full absolute "></div>
             <div className="w-[30em] h-[30em] bg-primaryGreen right-[64.3%] top-[-10em] rounded-full absolute "></div>
             <div className="w-[30em] h-[30em] bg-[#222] right-[46.6%] rounded-full absolute "></div>
             <div className="w-[30em] h-[30em] bg-primaryGreen right-[28.9%] top-[-10em] rounded-full absolute "></div>
             <div className="w-[30em] h-[30em] bg-[#222] right-[11.2%] rounded-full absolute "></div>
             <div className="w-[30em] h-[30em] bg-primaryGreen right-[-6.5%] top-[-10em] rounded-full absolute "></div>
        </div>
    )
}