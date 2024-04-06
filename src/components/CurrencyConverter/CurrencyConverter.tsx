
import NextStepBtn from "../NextStepBtn/NextStepBtn";
import Rools from "../Rools/Rools";
import "./CurrencyConverter.scss";

interface CurrencyConverterProps {
  children: React.ReactNode;
  sumGive: number;
  sumReceive: number;
  handleNextStep: () => void;
}

function CurrencyConverter({ children, sumGive, sumReceive, handleNextStep }: CurrencyConverterProps) {
  return (
    <section>
      <div className="converter">{children} </div>
      <Rools />
      <NextStepBtn sumGive={sumGive} sumReceive={sumReceive} handleNextStep={handleNextStep}/>
    </section>
  );
}

export default CurrencyConverter;
