import { useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { useAppDispatch } from "./hooks/useAppDispatch";
import {
  setCurrency,
  reverseCurrencies,
  setBank,
  setSumGive,
  setSumReceive,
  setInputError,
  setStep,
  setName,
  setBankAccount,
  setUploadedFileDetails,
  setAlert,
} from "./store/slices/currencySlice";
import "./fonts/fonts.css";
import "./App.scss";
import { SwapOutlined } from "@ant-design/icons";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import PaymentDetails from "./components/PaymentDetails/PaymentDetails";
import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter";
import Currency from "./components/Currency/Currency";
import { Banks } from "./types/types";
import { getExchangeRate } from "./utils/api";
import CreateOrder from "./pages/CreateOrder/CreateOrder";
import Footer from "./components/Footer/Footer";
// import { useNavigate } from "react-router-dom";
import RoolsPage from "./pages/RoolsPage/RoolsPage";
import KytPage from "./pages/KytPage/KytPage";
import SafetyPage from "./pages/SafetyPage/SafetyPage";
// import { useCreateOrderMutation } from "./services/api";

function App() {
  // const navigate = useNavigate();
  const banks: Banks = {
    rub: ["sber"],
    cny: ["alipay", "wechat"],
    gel: ["bog"],
    idr: ["mega"],
  };

  const {
    instances,
    sumGive,
    sumReceive,
    step,
    firstName,
    lastName,
    bankAccount,
    uploadedReceiveFileDetails,
  } = useSelector((state: RootState) => state.currency);

  const appDispatch = useAppDispatch();

  const isCurrencyNextDisabled = sumGive > 0 && sumReceive > 0 && step === 1;
  const isDetailsNextDisabled =
    firstName.length > 0 &&
    lastName.length > 0 &&
    step > 1 &&
    (bankAccount || uploadedReceiveFileDetails !== undefined);

  const setError = useCallback(
    (id: string, errMessage: string) => {
      appDispatch(setInputError({ instanceId: id, message: errMessage }));
    },
    [appDispatch]
  );

  const howMuchComission = useCallback(
    (way: string, amount: number): number => {
      let comission: number = 0;

      if (instances.give.selectedCurrency === "RUB") {
        if (5000 <= amount && amount < 30000) {
          comission = 0.07;
        } else if (30000 <= amount && amount <= 50000) {
          comission = 0.06;
        } else if (50000 <= amount && amount <= 300000) {
          comission = 0.05;
        } else if (5000 > amount || amount > 300000) {
          return 0;
        }
      }
      if (instances.give.selectedCurrency === "CNY") {
        if (350 <= amount && amount < 1000) {
          comission = 0.05;
        } else if (1000 <= amount && amount < 3500) {
          comission = 0.04;
        } else if (3500 <= amount && amount < 10000) {
          comission = 0.025;
        } else if (10000 <= amount && amount <= 25000) {
          comission = 0.02;
        } else if (400 > amount || amount > 25000) {
          return 0;
        }
      }
      if (instances.give.selectedCurrency === "UAH") {
        if (2000 <= amount && amount < 20000) {
          comission = 0.1;
        } else if (20000 <= amount && amount <= 50000) {
          comission = 0.09;
        } else if (2000 > amount || amount > 50000) {
          return 0;
        }
      }

      return comission;
    },
    [instances]
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
      const errMessage = `Укажите сумму от ${instances.give.limitFrom} до ${instances.give.limitTo}`;
      appDispatch(setSumGive(value));
      const rate = await getExchangeRate(
        instances.give.selectedCurrency,
        instances.receive.selectedCurrency
      );
      const comission = howMuchComission("give", value);
      if (comission === 0) {
        // Если появилась ошибка, и комиссия не была рассчитана
        appDispatch(setSumReceive(0)); // Установим sumReceive в 0
        setError("give", errMessage);
        return; // Выход из функции, чтобы не продолжать дальнейшие расчеты
      }
      setError("give", "");
      setError("receive", "");
      const initialReceiveSum = rate * value;
      const sumWithComission = Math.floor(
        initialReceiveSum - initialReceiveSum * comission
      );
      appDispatch(setSumReceive(Math.floor(sumWithComission)));
    },
    [appDispatch, instances, howMuchComission, setError]
  );

  const changeReceive = useCallback(
    async (value: number): Promise<void> => {
      const errMessage = `Укажите сумму от ${instances.receive.limitFrom} до ${instances.receive.limitTo}`;
      appDispatch(setSumReceive(value));
      const rate: number = await getExchangeRate(
        instances.give.selectedCurrency,
        instances.receive.selectedCurrency
      );
      const valueToComission = value / rate;

      const comission = howMuchComission("receive", valueToComission);
      const receiveSum = Math.floor(value / (rate * (1 - comission)));

      if (comission === 0) {
        setError("receive", errMessage);
        // Если появилась ошибка, и комиссия не была рассчитана
        appDispatch(setSumGive(0)); // Установим sumGive в 0
        return; // Выход из функции, чтобы не продолжать дальнейшие расчеты
      } else {
        setError("give", "");
        setError("receive", "");

        appDispatch(setSumGive(Math.floor(receiveSum)));
      }
    },
    [appDispatch, instances, howMuchComission, setError]
  );
  const handleNextStep = useCallback(() => {
    appDispatch(setStep(step + 1));
  }, [appDispatch, step]);

  const handleBackStep = useCallback(() => {
    appDispatch(setStep(step - 1));
    appDispatch(
      setAlert({
        message: "",
        severity: "error",
        instanceId: "receive",
      })
    );
    appDispatch(
      setUploadedFileDetails({ fileDetails: undefined, instanceId: "receive" })
    );
    appDispatch(setBankAccount(""));
  }, [appDispatch, step]);

  const handleChangeFirstName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const valueFromInput = String(e.target.value);
      appDispatch(setName({ witch: "first", value: valueFromInput }));
    },
    [appDispatch]
  );

  const handleChangeLastName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const valueFromInput = String(e.target.value);
      appDispatch(setName({ witch: "last", value: valueFromInput }));
    },
    [appDispatch]
  );

  const handleChangeBankAccount = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      appDispatch(setBankAccount(e.target.value));
    },
    [appDispatch]
  );

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Main>
              <CurrencyConverter
                isDisabled={!isCurrencyNextDisabled}
                handleNextStep={handleNextStep}
              >
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
                  step={step}
                />
                <button
                  onClick={reverseCurrency}
                  className="main__arrow-btn"
                  type="button"
                  disabled={step > 1}
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
                  step={step}
                />
              </CurrencyConverter>

              {(step === 2 || step === 3) && (
                <PaymentDetails
                  isDisabled={!isDetailsNextDisabled}
                  handleChangeFirstName={handleChangeFirstName}
                  handleChangeLastName={handleChangeLastName}
                  handleChangeBankAccount={handleChangeBankAccount}
                  handleBackStep={handleBackStep}
                  step={step}
                />
              )}
              {/* {step === 3 && <CreateOrder />} */}
            </Main>
          }
        />
        <Route path="order/:hash" element={<CreateOrder />} />
        <Route path="rools" element={<RoolsPage />} />
        <Route path="kyt" element={<KytPage />} />
        <Route path="safety" element={<SafetyPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
