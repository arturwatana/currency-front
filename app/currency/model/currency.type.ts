export type CurrencyType = {
  code: string;
  name: string;
  high: string;
  low: string;
  create_date: string;
};

export type CurrencyTypeRes = {
  id: string
} & CurrencyType
