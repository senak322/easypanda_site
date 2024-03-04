import { useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { setCurrencyGive, setCurrencyReceive, reverseCurrencies, setBankGive, setBankReceive } from "./store/slices/currencySlice";
import "./fonts/fonts.css";
import "./App.css";
import { SwapOutlined } from "@ant-design/icons";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import PaymentDetails from "./components/PaymentDetails/PaymentDetails";
import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter";
import Currency from "./components/Currency/Currency";
import { RootState } from "./store/store";

function App() {
  const currencyGive = useSelector((state: RootState) => state.currency.currencyGive);
  const currencyReceive = useSelector((state: RootState) => state.currency.currencyReceive);

  const appDispatch = useAppDispatch();

  const reverseCurrency = useCallback(() => {
    appDispatch(reverseCurrencies());
  }, [appDispatch]);

  const onGiveBankChange = useCallback((value: string) => {
    appDispatch(setBankGive(value));
  }, [appDispatch]);

  const onReceiveBankChange = useCallback((value: string) => {
    appDispatch(setBankReceive(value));
  }, [appDispatch]);

  const onCurrencyChangeGive = useCallback((value: string) => {
    appDispatch(setCurrencyGive(value));
  }, [appDispatch]);

  const onCurrencyChangeReceive = useCallback((value: string) => {
    appDispatch(setCurrencyReceive(value));
  }, [appDispatch]);

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
