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
  return (
    <Select
      className="mx-3"
      value={selectedCurrency}
      onChange={onCurrencyChange}
      options={allCurrencies.map((currency: string) => ({
        disabled: currency === disabledCurrency,
        key: currency,
        label: currency,
        value: currency,
      }))}
    ></Select>
  );
}

export default CurrencySelect;
