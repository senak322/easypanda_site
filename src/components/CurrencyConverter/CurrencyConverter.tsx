import NextStepBtn from "../NextStepBtn/NextStepBtn";
import Rools from "../Rools/Rools";
import "./CurrencyConverter.scss";
import { roolsLi } from "../../utils/config";

interface CurrencyConverterProps {
  children: React.ReactNode;
  handleNextStep: () => void;
  isDisabled: boolean;
}

function CurrencyConverter({
  children,
  handleNextStep,
  isDisabled,
}: CurrencyConverterProps) {
  return (
    <section className="converter">
      <div className="converter__wrapper">{children} </div>
      <Rools title="Правила обмена" list={roolsLi} />
      <NextStepBtn
        handleNextStep={handleNextStep}
        isDisabled={isDisabled}
        title="Следующий шаг"
      />
    </section>
  );
}

export default CurrencyConverter;
