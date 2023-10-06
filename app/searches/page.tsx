"use client";
import { useEffect, useState } from "react";
import { apolloClient } from "../utils/apollo.client";
import { gql } from "@apollo/client";
import { toast } from "react-toastify";
import { CurrencyType } from "../currency/model/currency.type";

export default function MySearches() {
  const [userSearches, setUserSearches] = useState<CurrencyType[]>();

  async function getUserSearches() {
    const token = localStorage.getItem("user_token");
    if (!token) {
      return;
    }
    try {
      const result = await apolloClient.query({
        query: gql`
          query searches {
            searches {
              name
              high
              low
              create_date
            }
          }
        `,
      });
      console.log(result);
      setUserSearches(result.data.searches);
      toast("Últimas pesquisas carregadas com sucesso!");
    } catch (err: any) {
      toast.error(err.networkError.result.errors[0].message);
    }
  }

  useEffect(() => {
    getUserSearches();
  }, []);

  return (
    <main className="w-full h-[100vh] bg-primaryGreen flex items-center justify-center ">
      <div className="flex  w-[70%] justify-center items-center flex-wrap gap-2">
        {userSearches
          ? userSearches.map((search: CurrencyType, index) => {
              return (
                <div key={index}>
                  <h1>{search.name}</h1>
                  <p>{search.low}</p>
                  <p>{search.high}</p>
                  <p>{search.create_date}</p>
                </div>
              );
            })
          : null}
      </div>
    </main>
  );
}
