import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrencyState {
  currencyGive: string;
  currencyReceive: string;
  // Добавьте типы для других полей состояния
}

const initialState: CurrencyState = {
  currencyGive: "RUB",
  currencyReceive: "CNY",
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  // ... другие связанные состояния

  reducers: {
    setCurrencyGive: (state, action: PayloadAction<string>) => {
      state.currencyGive = action.payload;
    },
    // ... другие редьюсеры для обновления состояния
  },
});

export const { setCurrencyGive /* ... другие экспорты действий */ } =
  currencySlice.actions;
