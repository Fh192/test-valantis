import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootDispatch, RootState } from '..';
import { currencyAPI } from '../../api/currencyAPI';
import { IHistoricalRate, IRate } from './../../types/currency';

const initialState = {
  prevISOdate: '' as string,
  rates: [] as IRate[],
  historicalRates: [] as IHistoricalRate[][],
};

export const getRates = createAsyncThunk<
  IRate[],
  void,
  { dispatch: RootDispatch; rejectValue: string }
>('currency/getRates', async (_, { dispatch, rejectWithValue }) => {
  try {
    const { Valute, PreviousDate } = await currencyAPI.daily();
    const rates = Object.values(Valute);

    dispatch(setPrevISODate(PreviousDate));

    return rates;
  } catch (err) {
    return rejectWithValue('Handle error here');
  }
});

export const getHistoricalRates = createAsyncThunk<
  IHistoricalRate[][],
  number | undefined,
  { state: RootState; rejectValue: string }
>(
  'currency/getHistoricalRates',
  async (days = 10, { getState, rejectWithValue }) => {
    try {
      const historicalRates: IHistoricalRate[][] = [];
      let prevISODate = getState().currency.prevISOdate;

      for (let i = 0; i < days; i++) {
        const prevDate = prevISODate.split('T')[0].replaceAll('-', '/');
        const { PreviousDate, Date, Valute } = await currencyAPI.historical(
          prevDate
        );
        const currencies = Object.values(Valute);

        historicalRates.push(
          currencies.map(currency => ({ ...currency, Date }))
        );
        prevISODate = PreviousDate;
      }

      return historicalRates;
    } catch (err) {
      return rejectWithValue('Handle error here');
    }
  }
);

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setPrevISODate: (state, action: PayloadAction<string>) => {
      state.prevISOdate = action.payload;
    },
  },
  extraReducers: b => {
    b.addCase(getRates.fulfilled, (state, action) => {
      state.rates = action.payload;
    });

    b.addCase(getHistoricalRates.fulfilled, (state, action) => {
      state.historicalRates = action.payload;
    });
  },
});

export const { setPrevISODate } = currencySlice.actions;
