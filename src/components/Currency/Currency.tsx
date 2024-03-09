import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import "./Currency.scss";
import { Select, Input } from "antd";
import CurrencyTitle from "../CurrencyTitle/CurrencyTitle";
import CurrencySelect from "../CurrencySelect/CurrencySelect";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import { Banks } from "../../types/types";
import { RootState } from "../../store/store";
import { allCurrencies } from "../../utils/config";

interface CurrencyProps {
  title: string;
  instanceId: string;
  onCurrencyChange: (value: string) => void;
  selectedCurrency: string;
  disabledCurrency: string;
  sum: number;
  changeSum: (value: number) => void;
  banks: Banks;
  onBankChange: (value: string) => void;
  selectedBank: string;
  // setBank: (instanceId: string, bank: string) => void;
}

function Currency({
  title,
  instanceId,
  onCurrencyChange,
  disabledCurrency,
  sum,
  changeSum,
  onBankChange,
}: CurrencyProps) {
  const windowWidth = useWindowWidth();
  const { instances } = useSelector(
    (state: RootState) => state.currency
  );
  const selectedCurrency = instances[instanceId].selectedCurrency;
  const selectedBank = instances[instanceId].selectedBank;
  const correctBanks: string[] = instances[instanceId].correctBanks;

  const handleChangeSum = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const valueNumber = parseFloat(e.target.value);
      if (!isNaN) {
        changeSum(valueNumber);
      }
    },
    [changeSum]
  );

  // const correctBanks = () => {
  //   const { selectedCurrency, correctBanks, selectedBank } =
  //     instances.instanceId;
  //   // selectedCurrency={currencyGive}
  //   // disabledCurrency={currencyReceive}
  //   // banks
  // };

  return (
    <div className="currency">
      <div className="d-flex justify-content-between mb-3">
        {title === "You give" ? (
          <>
            <CurrencyTitle title={title} />
            <CurrencySelect
              selectedCurrency={selectedCurrency}
              onCurrencyChange={onCurrencyChange}
              allCurrencies={allCurrencies}
              disabledCurrency={disabledCurrency}
            />
          </>
        ) : windowWidth >= 700 ? (
          <>
            <CurrencySelect
              selectedCurrency={selectedCurrency}
              onCurrencyChange={onCurrencyChange}
              allCurrencies={allCurrencies}
              disabledCurrency={disabledCurrency}
            />
            <CurrencyTitle title={title} />
          </>
        ) : (
          <>
            <CurrencyTitle title={title} />
            <CurrencySelect
              selectedCurrency={selectedCurrency}
              onCurrencyChange={onCurrencyChange}
              allCurrencies={allCurrencies}
              disabledCurrency={disabledCurrency}
            />
          </>
        )}
      </div>
      <div className="d-flex justify-content-between p-3 currency__container">
        <Input
          type="number"
          value={sum}
          onChange={handleChangeSum}
          prefix={
            selectedCurrency === "RUB"
              ? "₽"
              : selectedCurrency === "CNY"
              ? "¥"
              : selectedCurrency === "IDR"
              ? "Rp"
              : selectedCurrency === "GEL"
              ? "₾"
              : ""
          }
        />
        <Select
          value={selectedBank}
          onChange={onBankChange}
          options={correctBanks.map((bank: string) => ({
            key: bank,
            value: bank,
            label: bank,
          }))}
        ></Select>
      </div>
    </div>
  );
}

export default Currency;
