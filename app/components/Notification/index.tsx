import { socket } from "@/app/utils/socket.io"
import { useEffect } from 'react';


export default function Notification(){

    useEffect(() => {
        socket.on("connect", () => {
            console.log("connected")
        })
    }, [])

    return (
        <div>
            notification
        </div>
    )
}