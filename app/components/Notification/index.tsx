import Pusher from "pusher-js";
import { useEffect, useState } from 'react';
import IndividualNotification from "../IndividualNotification";
import { userRepository } from "@/app/repositories";
import { toast } from "react-toastify";
import {IoMdNotifications} from "react-icons/io"

interface NotificationProps {
  name: string
  read: boolean
  description: string
  userId: string
  createAt: Date
}


export default function Notification(){
    const [notifications, setNotifications] = useState<NotificationProps[]>([])
    const [notificationIsOpen, setNotificationIsOpen] = useState<boolean>(false)
    const [userId, setUserId] = useState<string>()


    
    async function pusher(){
        const pusher = new Pusher("7f0e3a323f03b1a35797", {
          cluster: 'us2',
            });
            pusher.connection.bind("connected",  () => {
            const channel = pusher.subscribe("notifications");
            channel.bind("new_notifications", async (data: NotificationProps[]) => {
              const userIdFromDB = await userRepository.getUserIdByToken()
              const userNotifications: NotificationProps[] = []
              if(userIdFromDB === "Ops, isso não foi possivel no momento") {
                toast(userIdFromDB)
                return 
              }
              data.map(notify => {
                if(notify.userId === userIdFromDB){
                  const notifyAlreadyInArray = userNotifications.find(notification => {
                    return notification.name === notify.name})
                    if(notifyAlreadyInArray){
                      return
                    }
                    userNotifications.push(notify)
                }
              })
              setNotifications(userNotifications)
            })
        })
        

    }

    useEffect(() => {
        pusher()
    }, [])

    useEffect(() => {
      console.log(notifications)
    }, [notifications])

    return (
        <div className="relative z-30 items-start md:w-full  " >
          <div className="relative">
            {notificationIsOpen ? (
              <>
               <p className="absolute bottom-7 left-3">|</p>
          <p className="absolute bottom-6 left-7 rotate-45">|</p>
          <p className="absolute bottom-5 right-7 rotate-[135deg]">|</p>
              </>
            ) : null}
         
          <IoMdNotifications className={`text-[30px] ${notificationIsOpen ? "text-primaryGreen" : "text-yellow-900"} transition-all`} onClick={() => setNotificationIsOpen(prev => !prev)}/>

          </div>
            {notificationIsOpen ? (
            <ul className="absolute border-[1px] border-white rounded-lg w-[13em]  left-[-7em] bg-[#222] text-center flex flex-col gap-2 pt-2">
                {notifications && notifications.length > 0 ? ( 
                  notifications.map((notify, index) => <IndividualNotification name={notify.name} key={index} createAt={notify.createAt} description={notify.description} read={notify.read} userId={notify.userId}/>)
                ) : <IndividualNotification name="Sem notificacoes" description="Ainda nao temos nada por aqui!"/> }

            </ul>
            ) : null}
        </div>
    )
}