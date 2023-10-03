"use client";
import Image from "next/image";
import { useState } from "react";
import { apolloClient } from "./utils/apollo.client";
import { gql } from "@apollo/client";

export default function Home() {
  const [currency, setCurrency] = useState<string>("");
  const [result, setResult] = useState<any>({});

  async function sendRequest() {
    apolloClient
      .query({
        query: gql`
          query test {
            users {
              id
              username
              password
              searches {
                code
                create_date
              }
            }
          }
        `,
      })
      .then((result) => console.log(result.data.users));
  }

  return (
    <main className="h-[100vh] w-full flex justify-center items-center flex-col gap-4 bg-primaryGreen text-white">
      <h1 className="w-full text-center text-[22px] font-bold ">
        Currency queries:
      </h1>
      <div className="flex gap-2">
        <input
          type="text"
          className="border-[1px] p-1 text-black "
          onChange={(e: any) => setCurrency(e.target.value)}
        />
        <button
          className="border-[1px] border-red-700 rounded-sm p-1"
          onClick={sendRequest}
        >
          Pesquisar
        </button>
      </div>

      <div>
        <p></p>
      </div>
    </main>
  );
}
