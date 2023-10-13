"use client";
import { useState } from "react";
import { apolloClient } from "./utils/apollo.client";
import { gql } from "@apollo/client";
import { toast } from "react-toastify";
import Search from "./components/Search";
import { CurrencyTypeRes } from "./currency/model/currency.type";

export default function Home() {
  const [currency, setCurrency] = useState<string>("");
  const [result, setResult] = useState<CurrencyTypeRes>();
  const [lastSearchByName, setLastSearchByName] = useState<CurrencyTypeRes>();
  async function getLastSearchByName(name: string) {
    try {
      const result = await apolloClient.query({
        query: gql`
          query getLastSearchByName($name: String!) {
            getLastSearchByName(name: $name) {
              name
              high
              low
              create_date
            }
          }
        `,
        variables: {
          name: currency,
        },
      });
      setLastSearchByName(result.data.getLastSearchByName);
    } catch (err: any) {
      console.log(err)
      console.log(err.networkError.result.errors[0].message);
    }
  }

  async function sendCurrencyRequest() {
    try {
      getLastSearchByName(currency);
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
      setResult(result.data.createCurrency);
      toast.success("Currency puxada com sucesso");
    } catch (err: any) {
      if (err.message === "Failed to fetch") {
        toast("Ops, isso não foi possivel no momento");
        return;
      }
      if (err.message.startsWith("moeda")) {
        toast(err.message);
        return;
      }
      toast.error(err.networkError.result.errors[0].message);
    }
  }

  return (
    <main className="w-full h-full min-h-[70vh] flex justify-center items-center  flex-col gap-16 bg-primaryGreen text-white">
      <div className="flex flex-col gap-5 ">
        <h1 className="w-full text-center text-[22px] font-bold ">
          Currency queries:
        </h1>
        <div className="flex gap-2">
          <input
            type="text"
            className="border-[1px] p-1 text-black rounded-md"
            onChange={(e: any) => setCurrency(e.target.value)}
            placeholder="Ex: USD"
          />
          <button
            className="border-[1px] rounded-md p-1 hover:bg-white hover:text-black hover:transition-colors"
            onClick={sendCurrencyRequest}
          >
            Pesquisar
          </button>
        </div>
      </div>

      <div>
        {result ? (
          <Search
          id={result.id}
            code={result.code}
            create_date={result.create_date}
            high={result.high}
            low={result.low}
            name={result.name}
            index={1}
          />
        ) : null}
      </div>

      {lastSearchByName ? (
        <div>
          <p>{lastSearchByName.name}</p>
          <p>{lastSearchByName.create_date}</p>
        </div>
      ) : null}
    </main>
  );
}
