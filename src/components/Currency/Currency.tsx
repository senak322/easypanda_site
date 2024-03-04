import "./Currency.scss";

import { Select, Input } from "antd";
import CurrencyTitle from "../CurrencyTitle/CurrencyTitle";
import CurrencySelect from "../CurrencySelect/CurrencySelect";
import { useWindowWidth } from "../../hooks/useWindowWidth";


interface CurrencyProps {
  title: string;
  onCurrencyChange: (value: string) => void;
  selectedCurrency: string;
  disabledCurrency: string;
}

function Currency({ title, onCurrencyChange, selectedCurrency, disabledCurrency }: CurrencyProps) {
  const windowWidth = useWindowWidth();
  
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
          onChange={(e) => changeSum(e.target.value)}
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
