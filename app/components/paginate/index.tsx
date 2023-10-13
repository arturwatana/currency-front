import { CurrencyTypeRes } from "@/app/currency/model/currency.type";
import Search from "../Search";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";

type PaginateProps = {
  elements: CurrencyTypeRes[];
  filterByName: string;
};

export default function Paginate({ elements }: PaginateProps) {
  const qtdPerPage = 10;
  const [paginateProps, setPaginateProps] = useState({
    page: 1,
    qtdPerPage: qtdPerPage,
    totalPages: Math.ceil(elements.length / qtdPerPage),
  });

  useEffect(() => {
    setPaginateProps({
      ...paginateProps,
      page: 1,
      totalPages: Math.ceil(elements.length / qtdPerPage),
    });
  }, [elements]);

  function renderPages() {
    const numberOfPages = [];
    for (let i = 1; i <= Math.ceil(elements.length / 9); i++) {
      numberOfPages.push(i);
    }
    return numberOfPages;
  }

  function renderFilteredCurrencies(elements: CurrencyTypeRes[]) {
    const lastElement = paginateProps.page * paginateProps.qtdPerPage;
    const firstElement =
      paginateProps.page * paginateProps.qtdPerPage - qtdPerPage;

    return elements.map((element, index) => {
      if (index >= firstElement && index + 1 <= lastElement) {
        return (
          <Search
          id={element.id}
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
            <BiArrowToLeft className="text-[30px]" />
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
            <AiOutlineArrowLeft className="text-[30px]" />
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
                } text-[20px]`}
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
            <AiOutlineArrowRight className="text-[30px]" />
          </p>
          <p
            onClick={() => {
              setPaginateProps({
                ...paginateProps,
                page: paginateProps.totalPages,
              });
            }}
          >
            <BiArrowToRight className="text-[30px]" />
          </p>
        </div>
      </div>
    </div>
  );
}
