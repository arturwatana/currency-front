"use client";
import { useEffect, useState } from "react";
import { apolloClient } from "../utils/apollo.client";
import { gql } from "@apollo/client";
import { toast } from "react-toastify";
import { CurrencyType } from "../currency/model/currency.type";
import Search from "../components/Search";
import Paginate from "../components/paginate";

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
    <main className="w-full  bg-primaryGreen flex items-center justify-center ">
      <div className="flex  w-[50%] justify-center items-center flex-wrap gap-2">
        {/* {userSearches
          ? userSearches.map((search: CurrencyType, index) => {
              return (
                <Search
                  code={search.code}
                  create_date={search.create_date}
                  high={search.high}
                  low={search.low}
                  name={search.name}
                  index={index}
                />
              );
            })
          : null} */}
        {userSearches ? <Paginate elements={userSearches} /> : null}
      </div>
    </main>
  );
}
