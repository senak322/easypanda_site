import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { banks } from "../../utils/config";
// import { Banks } from "../../types/types";

export interface CurrencyState {
  instances: {
    [key: string]: {
      selectedCurrency: string;
      correctBanks: string[];
      selectedBank: string;
      limitFrom: number;
      limitTo: number;
      inputError: string;
    };
  };
  sumGive: number;
  sumReceive: number;
}

const initialState: CurrencyState = {
  instances: {
    give: {
      selectedCurrency: "RUB",
      correctBanks: banks.rub,
      selectedBank: "SBER",
      limitFrom: 5000,
      limitTo: 300000,
      inputError: "",
    },
    receive: {
      selectedCurrency: "CNY",
      correctBanks: banks.cny,
      selectedBank: "AliPay",
      limitFrom: 400,
      limitTo: 25000,
      inputError: "",
    },
  },
  sumGive: 0,
  sumReceive: 0,
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  // ... другие связанные состояния

  reducers: {
    setCurrency: (
      state,
      action: PayloadAction<{ instanceId: string; currency: string }>
    ) => {
      const { instanceId, currency } = action.payload;
      const lowerCurrency = currency.toLowerCase() as keyof typeof banks; // Утверждение типа
      const instance = state.instances[instanceId];
      if (instance && banks[lowerCurrency]) {
        // Проверка на наличие ключа
        instance.selectedCurrency = currency;
        instance.correctBanks = banks[lowerCurrency];
        instance.selectedBank = instance.correctBanks[0];
        state.sumGive = 0;
        state.sumReceive = 0;
      }
    },

    reverseCurrencies: (state) => {
      // Сохраняем текущие значения для инстанса "give"
      const giveCurrency = state.instances.give.selectedCurrency;
      const giveBanks = state.instances.give.correctBanks;
      const giveBank = state.instances.give.selectedBank;
      const giveLimitFrom = state.instances.give.limitFrom;
      const giveLimitTO = state.instances.give.limitTo;

      // Обновляем инстанс "give" значениями из инстанса "receive"
      state.instances.give.selectedCurrency =
        state.instances.receive.selectedCurrency;
      state.instances.give.correctBanks = state.instances.receive.correctBanks;
      state.instances.give.selectedBank = state.instances.receive.selectedBank;
      state.instances.give.limitFrom = state.instances.receive.limitFrom;
      state.instances.give.limitTo = state.instances.receive.limitTo;
      state.instances.give.inputError = "";

      // Обновляем инстанс "receive" сохраненными ранее значениями инстанса "give"
      state.instances.receive.selectedCurrency = giveCurrency;
      state.instances.receive.correctBanks = giveBanks;
      state.instances.receive.selectedBank = giveBank;
      state.instances.receive.limitFrom = giveLimitFrom;
      state.instances.receive.limitTo = giveLimitTO
      state.instances.receive.inputError = "";

      // Обнуляем суммы
      state.sumGive = 0;
      state.sumReceive = 0;
    },
    setBank: (
      state,
      action: PayloadAction<{ instanceId: string; bank: string }>
    ) => {
      state.instances[action.payload.instanceId].selectedBank =
        action.payload.bank;
    },

    setSumGive: (state, action: PayloadAction<number>) => {
      state.sumGive = action.payload;
    },
    setSumReceive: (state, action: PayloadAction<number>) => {
      state.sumReceive = action.payload;
    },
    setInputError: (
      state,
      action: PayloadAction<{ instanceId: string; message: string }>
    ) => {
      state.instances[action.payload.instanceId].inputError =
        action.payload.message;
    },
    // ... другие редьюсеры для обновления состояния
  },
});

export const {
  setCurrency,
  reverseCurrencies,
  setBank,
  setSumGive,
  setSumReceive,
  setInputError,
} = currencySlice.actions;

// export const {currencyGive} = currencySlice.

export default currencySlice.reducer;
