import { useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./hooks/useAppDispatch";
import {
  setCurrency,
  reverseCurrencies,
  setBank,
  setSumGive,
  setSumReceive,
} from "./store/slices/currencySlice";
import "./fonts/fonts.css";
import "./App.css";
import { SwapOutlined } from "@ant-design/icons";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import PaymentDetails from "./components/PaymentDetails/PaymentDetails";
import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter";
import Currency from "./components/Currency/Currency";
import { RootState } from "./store/store";
import { Banks } from "./types/types";
import { getExchangeRate } from "./utils/api";

function App() {
  const banks: Banks = {
    rub: ["sber"],
    cny: ["alipay", "wechat"],
    gel: ["bog"],
    idr: ["mega"],
  };

  const { instances, sumGive, sumReceive } = useSelector(
    (state: RootState) => state.currency
  );

  const appDispatch = useAppDispatch();

  const getExchangeRate = useCallback(
    (currencyFrom: string, currencyTo: string): number => {
      // Здесь реализована логика получения обменного курса
      // Например, 1 RUB = 0,082011 CNY
      if (currencyFrom === "RUB" && currencyTo === "CNY") {
        return 0.082011;
      }
      // Обратный курс
      if (currencyFrom === "CNY" && currencyTo === "RUB") {
        return 12.19;
      }
      return 1;
    },
    []
  );

  const reverseCurrency = useCallback(() => {
    appDispatch(reverseCurrencies());
  }, [appDispatch]);

  const onGiveBankChange = useCallback(
    (value: string) => {
      appDispatch(setBank({instanceId: "give", bank: value}));
    },
    [appDispatch]
  );

  const onReceiveBankChange = useCallback(
    (value: string) => {
      appDispatch(setBank({instanceId: "receive", bank: value}));
    },
    [appDispatch]
  );

  const onCurrencyChangeGive = useCallback(
    (value: string) => {
      appDispatch(setCurrency({instanceId: 'give', currency: value}));
    },
    [appDispatch]
  );

  const onCurrencyChangeReceive = useCallback(
    (value: string) => {
      appDispatch(setCurrency({instanceId: 'receive', currency: value}));
    },
    [appDispatch]
  );

  const changeGive = useCallback(
    (value: number): void => {
      appDispatch(setSumGive(value));
      const rate = getExchangeRate(instances.give.selectedCurrency, instances.receive.selectedCurrency);
      const rateWithComission = rate * (1 - 0.05)
      const sumWithComission = value * rateWithComission
      // const sumWithComission = initalSum * 0.05
      appDispatch(setSumReceive(Math.floor(sumWithComission)));
    },
    [appDispatch, instances, getExchangeRate]
  );

  const changeReceive = useCallback(
    (value: number): void => {
      appDispatch(setSumReceive(value));
      const rate = getExchangeRate(instances.receive.selectedCurrency, instances.give.selectedCurrency);
      const rateWithComission = rate * (1 + 0.05)
      const sumWithComission = value * rateWithComission
      appDispatch(setSumGive(Math.floor(sumWithComission)));
    },
    [appDispatch, instances, getExchangeRate]
  );

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Main>
              <CurrencyConverter>
                <Currency
                  title="You give"
                  instanceId="give"
                  onCurrencyChange={onCurrencyChangeGive}
                  selectedCurrency={instances.give.selectedCurrency}
                  disabledCurrency={instances.receive.selectedCurrency}
                  sum={sumGive}
                  changeSum={changeGive}
                  banks={banks}
                  selectedBank={instances.give.selectedBank}
                  onBankChange={onGiveBankChange}
                  
                />
                <button
                  onClick={reverseCurrency}
                  className="main__arrow-btn"
                  type="button"
                >
                  <SwapOutlined />
                </button>
                <Currency
                  title="You receive"
                  instanceId="receive"
                  onCurrencyChange={onCurrencyChangeReceive}
                  selectedCurrency={instances.receive.selectedCurrency}
                  disabledCurrency={instances.give.selectedCurrency}
                  sum={sumReceive}
                  changeSum={changeReceive}
                  banks={banks}
                  selectedBank={instances.receive.selectedBank}
                  onBankChange={onReceiveBankChange}
                  
                />
              </CurrencyConverter>
            </Main>
          }
        />
        <Route path="/payment-details" element={<PaymentDetails />} />
      </Routes>
    </div>
  );
}

export default App;
