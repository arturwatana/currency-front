
"use client"

import { SessionProvider } from "next-auth/react";

export default function AuthProvider({children}: {children: React.ReactNode}){
    const values = {
        logged: true,
        expires: "5m"
    }
    return (
        <SessionProvider session={values}>
            {children}
        </SessionProvider>
    )
}