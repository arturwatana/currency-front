


export interface Last15DaysFromInterest {
    code: string
    codein: string
    from: string
    to: string
    name: string
    high: string
    low: string
    varBid: string
    pctChange: string
    bid: string
    ask: string
    timestamp: string
    create_date: string
    lastDays: LastDaysQuery[]
  }
  
  export interface LastDaysQuery{
    high: string
    low: string
    varBid: string
    pctChange: string
    bid: string
    ask: string
    timestamp: string
  }