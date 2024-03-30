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

  const { instances, sumGive, sumReceive } = useSelector(
    (state: RootState) => state.currency
  );

  const appDispatch = useAppDispatch();

  const setError = useCallback(
    (id: string, errMessage: string) => {
      appDispatch(setInputError({ instanceId: id, message: errMessage }));
    },
    [appDispatch]
  );

  const howMuchComission = useCallback(
    (way: string, amount: number): number => {
      let comission: number = 0;
      const errMessage = `Укажите сумму от ${instances[way].limitFrom} до ${instances[way].limitTo}`;

      if (instances.give.selectedCurrency === "RUB") {
        if (5000 <= amount && amount < 30000) {
          comission = 0.08;
          setError("give", "");
        } else if (30000 <= amount && amount <= 50000) {
          comission = 0.07;
          setError("give", "");
        } else if (50000 <= amount && amount <= 300000) {
          comission = 0.06;
          setError("give", "");
        } else if (5000 > amount || amount > 300000) {
          setError("give", errMessage);
          return 0;
        }
      }
      if (instances.give.selectedCurrency === "CNY") {
        if (400 <= amount && amount < 1000) {
          comission = 0.06;
          setError("give", "");
        } else if (1000 <= amount && amount < 3500) {
          comission = 0.05;
          setError("give", "");
        } else if (3500 <= amount && amount < 10000) {
          comission = 0.04;
          setError("give", "");
        } else if (10000 <= amount && amount <= 25000) {
          comission = 0.03;
          setError("give", "");
        } else if (400 > amount || amount > 25000) {
          setError("give", errMessage);
          appDispatch(setSumReceive(0));
          return 0;
        }
      }
      if (instances.give.selectedCurrency === "UAH") {
        if (2000 <= amount && amount < 20000) {
          comission = 0.1;
          setError("give", "");
        } else if (20000 <= amount && amount <= 50000) {
          comission = 0.09;
          setError("give", "");
        } else if (2000 > amount || amount > 50000) {
          setError("give", errMessage);
          appDispatch(setSumReceive(0));
          return 0;
        }
      }
      console.log(comission);

      return comission;
    },
    [instances, setError, appDispatch]
  );

  const reverseCurrency = useCallback(() => {
    appDispatch(reverseCurrencies());
  }, [appDispatch]);

  const onGiveBankChange = useCallback(
    (value: string) => {
      appDispatch(setBank({ instanceId: "give", bank: value }));
    },
    [appDispatch]
  );

  const onReceiveBankChange = useCallback(
    (value: string) => {
      appDispatch(setBank({ instanceId: "receive", bank: value }));
    },
    [appDispatch]
  );

  const onCurrencyChangeGive = useCallback(
    (value: string) => {
      appDispatch(setCurrency({ instanceId: "give", currency: value }));
    },
    [appDispatch]
  );

  const onCurrencyChangeReceive = useCallback(
    (value: string) => {
      appDispatch(setCurrency({ instanceId: "receive", currency: value }));
    },
    [appDispatch]
  );

  const changeGive = useCallback(
    async (value: number): Promise<void> => {
      appDispatch(setSumGive(value));
      const rate = await getExchangeRate(
        instances.give.selectedCurrency,
        instances.receive.selectedCurrency
      );
      const comission = howMuchComission("give", value);
      if (comission === 0) {
        // Если появилась ошибка, и комиссия не была рассчитана
        appDispatch(setSumReceive(0)); // Установим sumReceive в 0
        return; // Выход из функции, чтобы не продолжать дальнейшие расчеты
      }
      const initialReceiveSum = rate * value;
      const sumWithComission =
        initialReceiveSum - initialReceiveSum * comission;
      appDispatch(setSumReceive(Math.floor(sumWithComission)));
    },
    [appDispatch, instances, howMuchComission]
  );

  const changeReceive = useCallback(
    async (value: number): Promise<void> => {
      appDispatch(setSumReceive(value));
      const rate:number = await getExchangeRate(
        instances.give.selectedCurrency,
        instances.receive.selectedCurrency
      );
      const valueToComission = value / rate;
      console.log(valueToComission);

      const comission = howMuchComission("receive", valueToComission);
      if (comission === 0) {
        console.log("ошибка");
        // Если появилась ошибка, и комиссия не была рассчитана
        appDispatch(setSumGive(0)); // Установим sumGive в 0
        return; // Выход из функции, чтобы не продолжать дальнейшие расчеты
      }
      const receiveSum = value / (rate * (1 - comission));
      console.log(receiveSum > 0.000000);
      
      // const sumWithComission =
      //   initialReceiveSum + initialReceiveSum * comission;
      if(receiveSum > 0.000000) {
        console.log("ya tut");
        appDispatch(setSumGive(Math.floor(receiveSum)));
      }
      
    },
    [appDispatch, instances, howMuchComission]
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
