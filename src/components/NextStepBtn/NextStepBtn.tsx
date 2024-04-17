import { Button } from "@mui/material";
import "./NextStepBtn.scss";

interface NextStepBtnProps {
  handleNextStep: () => void;
  isDisabled: boolean;
  title: string;
  color:
    | "error"
    | "info"
    | "success"
    | "warning"
    | "inherit"
    | "primary"
    | "secondary";
}

function NextStepBtn({
  handleNextStep,
  isDisabled,
  title,
  color,
}: NextStepBtnProps) {
  return (
    <Button
      className="next-btn"
      variant="contained"
      disabled={isDisabled}
      color={color}
      onClick={handleNextStep}
      title="Следующий шаг"
    >
      {title}
    </Button>
  );
}

export default NextStepBtn;
