import { configureStore } from '@reduxjs/toolkit';
import { currencySlice } from './reducers/currencySlice';

export const store = configureStore({
  reducer: {
    [currencySlice.name]: currencySlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
