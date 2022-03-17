import { ICurrencyResponse } from '../types/currency';
import { api } from './instance';

export const currencyAPI = {
  daily: async () => {
    const response = await api.get<ICurrencyResponse>(`daily_json.js`);
    return response.data;
  },

  historical: async (date: string) => {
    const response = await api.get<ICurrencyResponse>(
      `archive/${date}/daily_json.js`
    );
    return response.data;
  },
};
