import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "./slices/currencySlice";

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
  },
});

// Определение типа AppDispatch
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
