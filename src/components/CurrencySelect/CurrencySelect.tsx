import "./CurrencySelect.scss";
import { Select } from "antd";

interface CurrencySelectProps {
  selectedCurrency: string;
  onCurrencyChange: (value: string) => void;
  allCurrencies: string[];
  disabledCurrency: string;
}

function CurrencySelect({
  selectedCurrency,
  onCurrencyChange,
  allCurrencies,
  disabledCurrency,
}: CurrencySelectProps) {
  const isDisabledCurrency = (currency: string): boolean => {
    // Условие для невозможности выбора RUB и UAH друг для друга
    if (
      (selectedCurrency === "CNY")
    ) {
      return true;
    }
    // Отключение выбранной валюты в другом селекте
    return currency === disabledCurrency;
  };
  return (
    <Select
      className="mx-3"
      value={selectedCurrency}
      onChange={onCurrencyChange}
      options={allCurrencies.map((currency: string) => ({
        disabled: isDisabledCurrency(currency),
        key: currency,
        label: currency,
        value: currency,
      }))}
    ></Select>
  );
}

export default CurrencySelect;
