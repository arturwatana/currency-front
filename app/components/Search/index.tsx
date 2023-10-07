import { CurrencyType } from "@/app/currency/model/currency.type";

type SearchComponentProps = {
  index: number;
} & CurrencyType;

export default function Search({
  code,
  create_date,
  high,
  low,
  name,
  index,
}: SearchComponentProps) {
  return (
    <div
      key={index}
      className=" bg-slate-400 shadow-md shadow-slate-900  text-white p-2 rounded-md hover:m-3 hover:scale-125 transition-all "
    >
      <h1 className="font-bold">Nome: {name}</h1>
      <p>Valor mais baixo: R$ {low}</p>
      <p>Valor mais alto: R$ {high}</p>
      <p>Data da consulta: {create_date}</p>
    </div>
  );
}
