import NextStepBtn from "../NextStepBtn/NextStepBtn";
import Rools from "../Rools/Rools";
import "./CurrencyConverter.scss";
import { roolsLi } from "../../utils/config";

interface CurrencyConverterProps {
  children: React.ReactNode;
  handleNextStep: () => void;
  isDisabled: boolean;
  step: number;
  handleBackStep: () => void;
}

function CurrencyConverter({
  children,
  handleNextStep,
  isDisabled,
  step,
  handleBackStep
}: CurrencyConverterProps) {
  return (
    <section className="converter">
      <div className="converter__wrapper">{children} </div>
      <Rools title="Правила обмена" list={roolsLi} />
      <div className="converter__btn-container">
        <NextStepBtn
          handleNextStep={handleNextStep}
          isDisabled={isDisabled}
          title="Следующий шаг"
          color="primary"
        />
        <NextStepBtn
          handleNextStep={handleBackStep}
          isDisabled={step === 1}
          title="Изменить детали"
          color="success"
        />
      </div>
    </section>
  );
}

export default CurrencyConverter;
