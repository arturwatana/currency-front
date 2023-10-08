import { CurrencyType } from "@/app/currency/model/currency.type";

type SearchComponentProps = {
  index: number;
} & CurrencyType;

export default function Search({
  create_date,
  high,
  low,
  name,
  index,
}: SearchComponentProps) {
  return (
    <div
      key={index}
      className=" bg-slate-200 shadow-md shadow-slate-900  text-[#333333] p-2 rounded-md hover:m-3 hover:scale-125 transition-all "
    >
      <h1 className="font-bold">Consulta nº: {index}</h1>
      <h1 className="font-bold">Nome: {name}</h1>
      <p className=" font-bold">
        Valor mais alto: R${" "}
        <span className="text-[#4CBB17] font-bold">{Math.ceil(+high)}</span>
      </p>
      <p className=" font-bold">
        Valor mais baixo: R$ <span className="text-[#FF4500]">{low}</span>
      </p>
      <p className=" font-bold">
        Data da consulta: <span className="text-[#666666] ">{create_date}</span>{" "}
      </p>
    </div>
  );
}
