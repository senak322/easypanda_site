import "./CurrencyTitle.scss";

interface CurrencyTitleProps {
  title: string;
}

function CurrencyTitle({ title }: CurrencyTitleProps) {
  return <h3 className="title fw-light">{title}</h3>;
}

export default CurrencyTitle;
