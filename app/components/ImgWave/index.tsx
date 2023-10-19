
import Image from "next/image"
type ImgWaveProps = {
    img: string
    width: string
}

export default function ImgWave({img, width}: ImgWaveProps){
    return (
        <div className={`w-[${width}] h-auto `}>
            <Image src={img} alt="login" className="w-full h-auto object-fill"/>
        </div>
    )
}