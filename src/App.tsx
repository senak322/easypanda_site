import { useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { reverseCurrencies } from "./store/slices/currencySlice";
import "./fonts/fonts.css";
import "./App.css";
import { SwapOutlined } from "@ant-design/icons";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import PaymentDetails from "./components/PaymentDetails/PaymentDetails";
import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter";
import Currency from "./components/Currency/Currency";

function App() {
  const appDispatch = useAppDispatch();

  const reverseCurrency = useCallback(() => {
    appDispatch(reverseCurrencies());
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
                  // onCurrencyChange={onCurrencyChangeGive}
                  // selectedCurrency={currencyGive}
                  // disabledCurrency={currencyReceive}
                  // sum={sumGive}
                  // changeSum={changeGive}
                  // banks={banks}
                  // selectedBank={bankGive}
                  // onBankChange={onGiveBankChange}
                  // setBank={setBankGive}
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
                  // onCurrencyChange={onCurrencyChangeReceive}
                  // selectedCurrency={currencyReceive}
                  // disabledCurrency={currencyGive}
                  // sum={sumReceive}
                  // changeSum={changeReceive}
                  // banks={banks}
                  // selectedBank={bankReceive}
                  // onBankChange={onReceiveBankChange}
                  // setBank={setBankReceive}
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
