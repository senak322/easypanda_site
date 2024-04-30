// import React, { useImperativeHandle, useRef } from "react";
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
  // const nextSectionRef = useRef(null);
  // useImperativeHandle(ref, () => ({
  //   scrollTo: () => window.scrollTo({ top: ref.current.offsetTop, behavior: 'smooth' })
  // }));
  // const handleNextStepWithScroll = () => {
  //   handleNextStep();
  //   nextSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  // };
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
      </div>
      {/* <div ref={nextSectionRef}></div> */}
    </section>
  );
}

export default CurrencyConverter;
