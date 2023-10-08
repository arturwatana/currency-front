import { CurrencyType } from "@/app/currency/model/currency.type";
import Search from "../Search";
import { useState } from "react";

type PaginateProps = {
  elements: CurrencyType[];
  filterByName: string;
};

export default function Paginate({ elements, filterByName }: PaginateProps) {
  const qtdPerPage = 10;
  const [paginateProps, setPaginateProps] = useState({
    page: 1,
    qtdPerPage: qtdPerPage,
    totalPages: Math.ceil(elements.length / qtdPerPage),
  });

  function renderPages() {
    const numberOfPages = [];
    for (let i = 1; i <= Math.ceil(elements.length / 9); i++) {
      numberOfPages.push(i);
    }
    return numberOfPages;
  }

  function renderFilteredCurrencies(elements: CurrencyType[]) {
    const lastElement = paginateProps.page * paginateProps.qtdPerPage;
    const firstElement =
      paginateProps.page * paginateProps.qtdPerPage - qtdPerPage;

    return elements.map((element, index) => {
      if (index >= firstElement && index + 1 <= lastElement) {
        return (
          <Search
            code={element.code}
            create_date={element.create_date}
            high={element.high}
            low={element.low}
            name={element.name}
            index={index}
          />
        );
      }
    });
  }

  return (
    <div className="w-full flex flex-col gap-5 ">
      <div className="flex flex-wrap  gap-5 items-center justify-center">
        {renderFilteredCurrencies(elements)}
      </div>
      <div className="flex  justify-around  text-white">
        <div className="flex gap-2">
          <p
            onClick={() => {
              setPaginateProps({
                ...paginateProps,
                page: 1,
              });
            }}
          >
            Primeira
          </p>
          <p
            onClick={() => {
              if (paginateProps.page === 1) {
                return;
              }
              setPaginateProps({
                ...paginateProps,
                page: paginateProps.page - 1,
              });
            }}
          >
            Voltar
          </p>
        </div>
        <div className="flex gap-2">
          {renderPages().map((page) => {
            return (
              <p
                onClick={() =>
                  setPaginateProps({
                    ...paginateProps,
                    page,
                  })
                }
                className={`pointer ${
                  paginateProps.page === page ? "font-bold" : null
                }`}
              >
                {page}
              </p>
            );
          })}
        </div>
        <div className="flex gap-2">
          <p
            onClick={() => {
              if (paginateProps.page === paginateProps.totalPages) {
                return;
              }
              setPaginateProps({
                ...paginateProps,
                page: paginateProps.page + 1,
              });
            }}
          >
            Próxima
          </p>
          <p
            onClick={() => {
              setPaginateProps({
                ...paginateProps,
                page: paginateProps.totalPages,
              });
            }}
          >
            Última
          </p>
        </div>
      </div>
    </div>
  );
}
