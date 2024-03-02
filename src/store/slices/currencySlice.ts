import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrencyState {
  currencyGive: string;
  currencyReceive: string;
  sumGive: number;
  sumReceive: number;
  // типы для других полей состояния
}

const initialState: CurrencyState = {
  currencyGive: "RUB",
  currencyReceive: "CNY",
  sumGive: 0,
  sumReceive: 0,
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  // ... другие связанные состояния

  reducers: {
    setCurrencyGive: (state, action: PayloadAction<string>) => {
      state.currencyGive = action.payload;
    },
    reverseCurrencies: (state) => {
      const temp = state.currencyGive;
      state.currencyGive = state.currencyReceive;
      state.currencyReceive = temp;
      state.sumGive = 0;
      state.sumReceive = 0;
    },
    // ... другие редьюсеры для обновления состояния
  },
});

export const { setCurrencyGive, reverseCurrencies } = currencySlice.actions;

export default currencySlice.reducer;
