import "./CurrencyConverter.scss";

interface CurrencyConverterProps {
  children: React.ReactNode;
}

function CurrencyConverter({ children }: CurrencyConverterProps) {
  return <div className="converter">{children}</div>;
}

export default CurrencyConverter;
