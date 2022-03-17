export interface IRate {
  ID: string;
  CharCode: string;
  Nominal: number;
  Name: string;
  Previous: number;
  Value: number;
}

export interface IHistoricalRate extends IRate {
  Date: string;
}

export interface ICurrencyResponse {
  Date: string;
  PreviousDate: string;
  Valute: {
    [key: string]: IRate;
  };
}
