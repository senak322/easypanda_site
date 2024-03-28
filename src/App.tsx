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
  setInputError,
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

  const { instances, sumGive, sumReceive, inputError } = useSelector(
    (state: RootState) => state.currency
  );

  const appDispatch = useAppDispatch();

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
   async (value: number): Promise<void> => {
      appDispatch(setSumGive(value));
      const rate = await getExchangeRate(instances.give.selectedCurrency, instances.receive.selectedCurrency);
      const rateWithComission = rate * (1 - 0.05)
      const sumWithComission = value * rateWithComission
      appDispatch(setSumReceive(Math.floor(sumWithComission)));
    },
    [appDispatch, instances]
  );

  const changeReceive = useCallback(
    async (value: number): Promise<void> => {
      appDispatch(setSumReceive(value));
      const rate = await getExchangeRate(instances.receive.selectedCurrency, instances.give.selectedCurrency);
      const rateWithComission = rate * (1 + 0.05)
      const sumWithComission = value * rateWithComission
      appDispatch(setSumGive(Math.floor(sumWithComission)));
    },
    [appDispatch, instances]
  );

  const howMuchComission = useCallback(():number | void => {
    let comission: number = 0

    if(sumGive <= 0) {
      setInputError(`Укажите сумму от ${instances.receive.limitFrom} до ${instances.receive.limitTo}`)
      return 
    }
    
    if(instances.give.selectedCurrency === "RUB") {
      
    }
    return comission
  }, [])

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
