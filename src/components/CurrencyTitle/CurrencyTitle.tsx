import React from 'react';
import "./CurrencyTitle.scss";

interface CurrencyTitleProps {
  title: string;
}

function CurrencyTitle({ title }: CurrencyTitleProps) {
  return <h2 className="title fw-light mx-3">{title}</h2>;
}

export default CurrencyTitle;
