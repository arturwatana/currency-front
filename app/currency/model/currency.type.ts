export type CurrencyType = {
  code: string;
  from: string;
  to: string
  name: string
  high: string;
  low: string;
  create_date: string;
  lastDays?: LastDaysQuery[]
};

interface LastDaysQuery{
  high: string
  low: string
  varBid: string
  pctChange: string
  bid: string
  ask: string
  timestamp: string
}


export type CurrencyTypeRes = {
  id: string
} & CurrencyType
