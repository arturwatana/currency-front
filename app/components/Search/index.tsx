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
  function formatCoin(coin: number) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(coin);
  }
  return (
    <div
      key={index}
      className=" bg-slate-200 shadow-md shadow-slate-900  text-[#333333] p-2 rounded-md hover:m-3 hover:scale-125 transition-all "
    >
      <h1 className="font-bold">Consulta nº: {index + 1}</h1>
      <h1 className="font-bold">Nome: {name}</h1>
      <p className=" font-bold">
        Valor mais alto:
        <span className="text-[#4CBB17] font-bold">{formatCoin(+high)}</span>
      </p>
      <p className=" font-bold">
        Valor mais baixo:
        <span className="text-[#FF4500]">{formatCoin(+low)}</span>
      </p>
      <p className=" font-bold">
        Data da consulta: <span className="text-[#666666] ">{create_date}</span>{" "}
      </p>
    </div>
  );
}
