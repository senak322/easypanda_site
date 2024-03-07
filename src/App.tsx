import { useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./hooks/useAppDispatch";
import {
  setCurrency,
  reverseCurrencies,
  setBankGive,
  setBankReceive,
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

function App() {
  const banks: Banks = {
    rub: ["sber"],
    cny: ["alipay", "wechat"],
    gel: ["bog"],
    idr: ["mega"],
  };

  const { currencyGive, currencyReceive, bankGive, bankReceive, sumGive, sumReceive } = useSelector(
    (state: RootState) => state.currency
  );

  // const sumGive = useSelector((state: RootState) => state.currency.sumGive);
  // const sumReceive = useSelector(
  //   (state: RootState) => state.currency.sumReceive
  // );

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
      appDispatch(setBankGive(value));
    },
    [appDispatch]
  );

  const onReceiveBankChange = useCallback(
    (value: string) => {
      appDispatch(setBankReceive(value));
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
      appDispatch(setCurrency({instanceId: 'recieve', currency: value}));
    },
    [appDispatch]
  );

  const changeGive = useCallback(
    (value: number): void => {
      appDispatch(setSumGive(value));
      const rate = getExchangeRate(currencyGive, currencyReceive);
      appDispatch(setSumReceive(Math.floor(value * 1.15 * rate)));
    },
    [appDispatch, currencyGive, currencyReceive, getExchangeRate]
  );

  const changeReceive = useCallback(
    (value: number): void => {
      appDispatch(setSumReceive(value));
      const rate = getExchangeRate(currencyGive, currencyReceive);
      appDispatch(setSumGive(Math.floor(value * 1.15 * rate)));
    },
    [appDispatch, currencyGive, currencyReceive, getExchangeRate]
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
                  selectedCurrency={currencyGive}
                  disabledCurrency={currencyReceive}
                  sum={sumGive}
                  changeSum={changeGive}
                  banks={banks}
                  selectedBank={bankGive}
                  onBankChange={onGiveBankChange}
                  setBank={setBankGive}
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
                  selectedCurrency={currencyReceive}
                  disabledCurrency={currencyGive}
                  sum={sumReceive}
                  changeSum={changeReceive}
                  banks={banks}
                  selectedBank={bankReceive}
                  onBankChange={onReceiveBankChange}
                  setBank={setBankReceive}
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
