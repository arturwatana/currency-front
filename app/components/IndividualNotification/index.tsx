
interface IndividualNotificationProps {
    name: string
    description: string
    read?: boolean
    userId?: string
    createAt?: Date
}

export default function IndividualNotification({createAt,description,name,read,userId}: IndividualNotificationProps){
    return (
        <li className="w-full border-b-[1px] border-white p-2">
        <h1 className="text-[14px] font-bold">{name}</h1>
        <p className="text-[12px]">{description}</p>
      </li>
    )
}