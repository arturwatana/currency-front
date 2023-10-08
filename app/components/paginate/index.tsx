import { CurrencyType } from "@/app/currency/model/currency.type";
import Search from "../Search";
import { useEffect, useState } from "react";

type PaginateProps = {
  elements: CurrencyType[];
};

export default function Paginate({ elements }: PaginateProps) {
  const [paginateProps, setPaginateProps] = useState({
    page: 1,
    qtdPerPage: 9,
    totalPages: Math.ceil(elements.length / 9),
  });

  function renderPages() {
    const numberOfPages = [];
    for (let i = 1; i <= Math.ceil(elements.length / 9); i++) {
      numberOfPages.push(i);
    }
    return numberOfPages;
  }

  return (
    <div className="w-full flex flex-col gap-5 ">
      <div className="flex flex-wrap  gap-5 items-center justify-center">
        {elements.map((element, index) => {
          const lastElement = paginateProps.page * paginateProps.qtdPerPage;
          const firstElement =
            paginateProps.page * paginateProps.qtdPerPage - 9;

          if (index >= firstElement && index <= lastElement) {
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
        })}
      </div>
      <div className="flex  justify-between">
        <div className="flex">
          <p>tudo</p>
          <p>voltar</p>
        </div>
        <div className="flex">
          {renderPages().map((page) => {
            return (
              <p
                onClick={() =>
                  setPaginateProps({
                    ...paginateProps,
                    page: page,
                  })
                }
                className="pointer"
              >
                {page}
              </p>
            );
          })}
        </div>
        <div className="flex">
          <p>frente</p>
          <p>tudo</p>
        </div>
      </div>
    </div>
  );
}
