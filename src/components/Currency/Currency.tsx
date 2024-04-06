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
  const { instances } = useSelector((state: RootState) => state.currency);
  const selectedCurrency = instances[instanceId].selectedCurrency;
  const selectedBank = instances[instanceId].selectedBank;
  const correctBanks: string[] = instances[instanceId].correctBanks;

  // console.log(instances[instanceId].inputError);
  
  const handleChangeSum = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // Получаем значение из инпута
      const value = e.target.value;

      // Проверяем, пустая ли строка, и приводим к 0, если да.
      // Если нет, преобразуем строку в число
      const numberValue = value === "" ? 0 : parseFloat(value);

      // Обновляем состояние с помощью значения numberValue
      changeSum(numberValue);
    },
    [changeSum]
  );

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
          className="mx-1 currency__input"
          value={sum}
          onChange={handleChangeSum}
          prefix={
            selectedCurrency === "RUB"
              ? "₽"
              : selectedCurrency === "CNY"
              ? "¥"
              : // : selectedCurrency === "IDR"
              // ? "Rp"
              // : selectedCurrency === "GEL"
              // ? "₾"
              selectedCurrency === "UAH"
              ? "₴"
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
      <span className={`currency__input-error ${instances[instanceId].inputError ? 'currency__input-error_show' : 'currency__input-error_hide'}`}>
        {instances[instanceId].inputError}
      </span>
    </div>
  );
}

export default Currency;
