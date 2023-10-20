import { CurrencyTypeRes } from "@/app/currency/model/currency.type";
import Search from "../Search";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";

type PaginateProps = {
  elements: CurrencyTypeRes[];
  filterByName: string;
  categories: string[]
};

export default function Paginate({ elements, filterByName, categories }: PaginateProps) {
  const qtdPerPage = 25;
  const [paginateProps, setPaginateProps] = useState({
    page: 1,
    qtdPerPage: qtdPerPage,
    totalPages: Math.ceil(elements.length / qtdPerPage),
  });
  const [deletedSearchId, setDeleteSearchId] = useState<string>("")
  const [elementsToShow, setElementsToShow] = useState(elements)

  useEffect(() => {
    setPaginateProps({
      ...paginateProps,
      page: 1,
      totalPages: Math.ceil(elements.length / qtdPerPage),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elements]);

  useEffect(() => {
      if(deletedSearchId.length > 1){
       const newElements = elementsToShow.filter(element => {
          if(element.id === deletedSearchId){
            return 
          }
          return element
        })
        setElementsToShow(newElements)
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedSearchId])

  function renderPages() {
    const numberOfPages = [];
    for (let i = 1; i <= paginateProps.totalPages ; i++) {
      numberOfPages.push(i);
    }
    return numberOfPages;
  }

  function renderFilteredCurrencies(elementsToShow: CurrencyTypeRes[]) {
    const lastElement = paginateProps.page * paginateProps.qtdPerPage;
    const firstElement =
      paginateProps.page * paginateProps.qtdPerPage - qtdPerPage;

      if(filterByName != "Todas"){
        const filteredElements = elementsToShow.filter(element => {
          if(element.code === filterByName){
            return element
          }
          return 
          })
        return filteredElements.map((element, index) => {
          if (index >= firstElement && index + 1 <= lastElement) {
            return (
              <Search
                setDeleteSearchId={setDeleteSearchId}
                id={element.id}
                code={element.code}
                create_date={element.create_date}
                high={element.high}
                low={element.low}
                name={element.name}
                index={index}
                key={ `element${index}`}
              />
            );
          }
        });
      }

    return elementsToShow.map((element, index) => {
      if (index >= firstElement && index + 1 <= lastElement) {
        return (
          <Search
            setDeleteSearchId={setDeleteSearchId}
            id={element.id}
            code={element.code}
            create_date={element.create_date}
            high={element.high}
            low={element.low}
            name={element.name}
            index={index}
            key={ `element${index}`}

          />
        );
      }
    });
  }

  return (
    <div className="w-full flex flex-col gap-5 ">
      <div className="flex flex-wrap  gap-5 items-center justify-center">
        {renderFilteredCurrencies(elementsToShow)}
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
          {renderPages().map((page, index) => {
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
                key={ `p${index}`}

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
