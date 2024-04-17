import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import "./Currency.scss";
import { Select, Input } from "antd";
import CurrencyTitle from "../CurrencyTitle/CurrencyTitle";
import CurrencySelect from "../CurrencySelect/CurrencySelect";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import { Bank, Banks } from "../../types/types";
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
  step: number;
}

function Currency({
  title,
  instanceId,
  onCurrencyChange,
  disabledCurrency,
  sum,
  changeSum,
  onBankChange,
  step,
}: CurrencyProps) {
  const windowWidth = useWindowWidth();
  const { instances } = useSelector((state: RootState) => state.currency);
  const selectedCurrency = instances[instanceId].selectedCurrency;
  const selectedBank = instances[instanceId].selectedBank;
  const correctBanks: Bank[] = instances[instanceId].correctBanks;

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
              step={step}
            />
          </>
        ) : windowWidth >= 700 ? (
          <>
            <CurrencySelect
              selectedCurrency={selectedCurrency}
              onCurrencyChange={onCurrencyChange}
              allCurrencies={allCurrencies}
              disabledCurrency={disabledCurrency}
              step={step}
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
              step={step}
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
          disabled={step > 1}
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
          disabled={step > 1}
          value={selectedBank}
          onChange={onBankChange}
        >
          {correctBanks?.map((bank) => (
            <Select.Option key={bank.name} value={bank.name}>
              <img src={bank.icon} alt={bank.name} className="currency__option-img" />
              {bank.name}
            </Select.Option>
          ))}
        </Select>
      </div>
      <span
        className={`currency__input-error ${
          instances[instanceId].inputError
            ? "currency__input-error_show"
            : "currency__input-error_hide"
        }`}
      >
        {instances[instanceId].inputError}
      </span>
    </div>
  );
}

export default Currency;
