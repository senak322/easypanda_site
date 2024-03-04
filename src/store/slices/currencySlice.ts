import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CurrencyState {
  currencyGive: string;
  currencyReceive: string;
  sumGive: number;
  sumReceive: number;
  bankGive: string;
  bankReceive: string;
  // типы для других полей состояния
}

const initialState: CurrencyState = {
  currencyGive: "RUB",
  currencyReceive: "CNY",
  sumGive: 0,
  sumReceive: 0,
  bankGive: "",
  bankReceive: "",
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  // ... другие связанные состояния

  reducers: {
    setCurrencyGive: (state, action: PayloadAction<string>) => {
      state.currencyGive = action.payload;
      state.sumGive = 0;
      state.sumReceive = 0;
    },
    setCurrencyReceive: (state, action: PayloadAction<string>) => {
      state.currencyReceive = action.payload;
      state.sumGive = 0;
      state.sumReceive = 0;
    },
    reverseCurrencies: (state) => {
      const temp = state.currencyGive;
      state.currencyGive = state.currencyReceive;
      state.currencyReceive = temp;
      state.sumGive = 0;
      state.sumReceive = 0;
    },
    setBankGive: (state, action: PayloadAction<string>) => {
      state.bankGive = action.payload;
    },
    setBankReceive: (state, action: PayloadAction<string>) => {
      state.bankReceive = action.payload;
    },
    setSumGive: (state, action: PayloadAction<number>) => {
      state.sumGive = action.payload;
    },
    setSumReceive: (state, action: PayloadAction<number>) => {
      state.sumReceive = action.payload;
    },

    // ... другие редьюсеры для обновления состояния
  },
});

export const {
  setCurrencyGive,
  setCurrencyReceive,
  reverseCurrencies,
  setBankGive,
  setBankReceive,
  setSumGive,
  setSumReceive,
} = currencySlice.actions;

// export const {currencyGive} = currencySlice.

export default currencySlice.reducer;
