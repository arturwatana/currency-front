"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { apolloClient } from "../utils/apollo.client";
import { gql } from "@apollo/client";
import { toast } from "react-toastify";
import { CurrencyType, CurrencyTypeRes } from "../currency/model/currency.type";
import Search from "../components/Search";
import Paginate from "../components/paginate";
import NavBar from "../components/navbar";
import { userRepository } from "../repositories";

export default function MySearches() {
  const [userSearches, setUserSearches] = useState<CurrencyTypeRes[]>();
  
  const [filterByName, setFilterByName] = useState<string>("Todas");

  async function getUserSearches() {
    const token = localStorage.getItem("user_token");
    if (!token) {
      return;
    }
    const getUserSearchesRes = await userRepository.getUserSearches()
    if(typeof getUserSearchesRes === "string"){
      toast.error(getUserSearchesRes)
      return
    }
    setUserSearches(getUserSearchesRes)
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
    return categories.map((category, index) => <option key={`key${index}`} >{category}</option>);
  }

  useEffect(() => {
    getUserSearches()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, 
  []);

  return (
    <main className="w-full flex-col  bg-primaryGreen flex items-center justify-center ">
          <NavBar />
      <div className="flex flex-col  w-[65%] justify-between items-center flex-wrap gap-5">
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
