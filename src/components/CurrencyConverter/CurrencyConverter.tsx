
import NextStepBtn from "../NextStepBtn/NextStepBtn";
import Rools from "../Rools/Rools";
import "./CurrencyConverter.scss";

interface CurrencyConverterProps {
  children: React.ReactNode;
  handleNextStep: () => void;
  isDisabled: boolean
}

function CurrencyConverter({ children, handleNextStep, isDisabled }: CurrencyConverterProps) {
  return (
    <section>
      <div className="converter">{children} </div>
      <Rools />
      <NextStepBtn handleNextStep={handleNextStep} isDisabled={isDisabled} title="Следующий шаг"/>
    </section>
  );
}

export default CurrencyConverter;
