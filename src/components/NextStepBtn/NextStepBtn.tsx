import { Button } from "@mui/material";
import "./NextStepBtn.scss";

interface NextStepBtnProps {
  
  handleNextStep: () => void;
  isDisabled: boolean
  title: string
}

function NextStepBtn({
  handleNextStep,
  isDisabled,
  title,
}: NextStepBtnProps) {
  return (
    <Button
      className="next-btn"
      variant="contained"
      disabled={isDisabled}
      color="primary"
      onClick={handleNextStep}
      title="Следующий шаг"
    >
     {title}
    </Button>
  );
}

export default NextStepBtn;
