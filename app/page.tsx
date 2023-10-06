"use client";
import { useEffect, useState } from "react";
import { apolloClient } from "./utils/apollo.client";
import { gql } from "@apollo/client";
import { toast } from "react-toastify";

export default function Home() {
  const [currency, setCurrency] = useState<string>("");
  const [result, setResult] = useState<any>();

  async function sendCurrencyRequest() {
    try {
      const result = await apolloClient.mutate({
        mutation: gql`
          mutation createCurrency($data: CurrencyReq) {
            createCurrency(data: $data) {
              name
              high
              low
              create_date
            }
          }
        `,
        variables: {
          data: {
            name: currency,
          },
        },
      });
      setResult(result);
      toast.success("Currency puxada com sucesso");
    } catch (err: any) {
      if (err.message.startsWith("moeda")) {
        toast(err.message);
        return;
      }
      toast.error(err.networkError.result.errors[0].message);
    }
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
          onClick={sendCurrencyRequest}
        >
          Pesquisar
        </button>
      </div>

      {result ? (
        <div>
          <h1>{result.data.createCurrency.name}</h1>
          <p>{result.data.createCurrency.low}</p>
          <p>{result.data.createCurrency.high}</p>
          <p>{result.data.createCurrency.create_date}</p>
        </div>
      ) : null}
    </main>
  );
}
