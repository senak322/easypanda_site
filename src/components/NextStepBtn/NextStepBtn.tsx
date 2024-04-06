import { Button } from "@mui/material";
import "./NextStepBtn.scss";

interface NextStepBtnProps {
  sumGive: number;
  sumReceive: number;
  handleNextStep: () => void;
}

function NextStepBtn({
  sumGive,
  sumReceive,
  handleNextStep,
}: NextStepBtnProps) {
  return (
    <Button
      className="next-btn"
      variant="contained"
      disabled={sumGive <= 0 || sumReceive <= 0}
      color="primary"
      onClick={handleNextStep}
    >
      Следующий шаг
    </Button>
  );
}

export default NextStepBtn;
