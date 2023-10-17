"use client";
import { useCallback, useEffect, useState } from "react";
import { apolloClient } from "../utils/apollo.client";
import { gql } from "@apollo/client";
import { toast } from "react-toastify";
import { CurrencyType, CurrencyTypeRes } from "../currency/model/currency.type";
import Search from "../components/Search";
import Paginate from "../components/paginate";

export default function MySearches() {
  const [userSearches, setUserSearches] = useState<CurrencyTypeRes[]>();
  const [filterByName, setFilterByName] = useState<string>("Todas");

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
              code
              name
              high
              low
              create_date
              id
            }
          }
        `,
      });
      setUserSearches(result.data.searches);
      toast("Últimas pesquisas carregadas com sucesso!");
      return result.data.searches
    } catch (err: any) {
      if (err.message === "Failed to fetch") {
        toast("Ops, isso não foi possivel no momento");
        return;
      }
      toast.error(err.networkError.result.errors[0].message);
    }
  }

  function filterCategories() {
    if (userSearches) {
      let categories = userSearches;
      if (filterByName === "Todas") {
        return categories;
      }

      return userSearches?.filter((search) => search.code === filterByName);
    }
    return [];
  }

  function getCategories() {
    const categories = userSearches?.map((search) => {
      return search.code;
    });
    const uniqueCategories = [...new Set(categories)];
    return uniqueCategories
  }

  function renderCategories(categories: string[]){
    return categories.map((category) => <option>{category}</option>);

  }

  useEffect(() => {
    getUserSearches();
  }, []);

  return (
    <main className="w-full  bg-primaryGreen flex items-center justify-center ">
      <div className="flex flex-col  w-[75%] justify-between items-center flex-wrap gap-5">
        <div>
          <h3 className="font-bold text-white">Buscar por moeda:</h3>
          <select
            className="w-full text-center"
            onChange={(e) => {
              setFilterByName(e.target.value);
            }}
          >
            <option>Todas</option>
            {userSearches ? renderCategories(getCategories()) : null}
          </select>
        </div>
        <div>
          {userSearches ? (
            <Paginate
              categories={getCategories()}
              elements={filterCategories()}
              filterByName={filterByName}
            />
          ) : (
            <p className="text-white font-bold text-lg">Loading</p>
          )}
        </div>
      </div>
    </main>
  );
}
