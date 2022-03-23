import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootDispatch, RootState } from '..';
import { currencyAPI } from '../../api/currencyAPI';
import { IHistoricalRate, IRate } from './../../types/currency';

const initialState = {
  prevISOdate: '',
  rates: [] as IRate[],
  historicalRates: [] as IHistoricalRate[][],
  isHistoricalRatesFetching: false,
  isRatesFetching: false,
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
  void,
  number | undefined,
  { state: RootState; rejectValue: string; dispatch: RootDispatch }
>(
  'currency/getHistoricalRates',
  async (days = 10, { getState, rejectWithValue, dispatch }) => {
    try {
      let prevISODate = getState().currency.prevISOdate;

      for (let i = 0; i < days; i++) {
        const prevDate = prevISODate.split('T')[0].replaceAll('-', '/');
        const { PreviousDate, Date, Valute } = await currencyAPI.historical(
          prevDate
        );
        const rates = Object.values(Valute).map(currency => ({
          ...currency,
          Date,
        }));

        dispatch(setHistoricalRates(rates));
        prevISODate = PreviousDate;
      }
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

    setHistoricalRates: (state, action: PayloadAction<IHistoricalRate[]>) => {
      state.historicalRates.push(action.payload);
    },
  },
  extraReducers: b => {
    b.addCase(getRates.fulfilled, (state, action) => {
      state.rates = action.payload;
      state.isRatesFetching = false;
    });

    b.addCase(getRates.pending, state => {
      state.isRatesFetching = true;
    });

    b.addCase(getHistoricalRates.fulfilled, state => {
      state.isHistoricalRatesFetching = false;
    });

    b.addCase(getHistoricalRates.pending, state => {
      state.isHistoricalRatesFetching = true;
    });
  },
});

export const { setPrevISODate, setHistoricalRates } = currencySlice.actions;
