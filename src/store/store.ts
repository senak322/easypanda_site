import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    // здесь будут reducers
  },
});

// Определение типа AppDispatch
export type AppDispatch = typeof store.dispatch;

export default store;
