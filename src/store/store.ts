import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "./slices/currencySlice";
import { apiSlice } from "../services/api";

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)
});

// Определение типа AppDispatch
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;

