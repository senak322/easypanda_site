import "./PaymentDetails.scss";
import { Button, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import NextStepBtn from "../NextStepBtn/NextStepBtn";
import Rools from "../Rools/Rools";
import { paymentLi } from "../../utils/config";

interface PaymentDetailsProps {
  isDisabled: boolean;
  handleNextStep: () => void;
  handleChangeFirstName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeLastName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeBankAccount: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function PaymentDetails({ isDisabled, handleNextStep, handleChangeFirstName, handleChangeLastName, handleChangeBankAccount }: PaymentDetailsProps) {
  const { instances, firstName, lastName, bankAccount } = useSelector(
    (state: RootState) => state.currency
  );

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const accountData =
    instances.receive.selectedCurrency === "RUB" ||
    instances.receive.selectedCurrency === "UAH"
      ? "Номер карты"
      : instances.receive.selectedCurrency === "CNY" &&
        instances.receive.selectedBank === "AliPay"
      ? "Аккаунт Alipay"
      : "";

  const discriptionData =
    accountData === "Аккаунт Alipay"
      ? "12345678 (номер Alipay) или example@live.cn (почта Alipay)"
      : "9876543217654321";

  return (
    <section className="payment">
      <div className="payment__container">
        <h4 className="mb-4">Укажите реквизиты получателя</h4>
        <div className="payment__wrapper">
          {/* <div className="payment__input-container"> */}
          <TextField
            id="outlined-basic"
            label="Имя"
            variant="outlined"
            value={firstName}
            onChange={handleChangeFirstName}
          />
          <TextField
            id="outlined-basic"
            label="Фамилия"
            variant="outlined"
            value={lastName}
            onChange={handleChangeLastName}
          />
          {/* </div> */}
          <div className="payment__input-container">
            {accountData && (
              <TextField
                id="outlined-basic"
                label={accountData}
                variant="outlined"
                value={bankAccount}
                onChange={handleChangeBankAccount}
              />
            )}
            {accountData && accountData !== "Номер карты" && <p className="payment__or">или</p>}
            {instances.receive.selectedCurrency === "CNY" && (
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Загрузить QR
                <VisuallyHiddenInput type="file" />
              </Button>
            )}
          </div>
        </div>
        <Rools
          title="Примечание"
          list={paymentLi}
          account={
            accountData ? (
              <li>
                Укажите {accountData} в формате {discriptionData}
              </li>
            ) : (
              ""
            )
          }
        />

        <NextStepBtn
          handleNextStep={handleNextStep}
          isDisabled={isDisabled}
          title="Создать заявку"
        />
      </div>
    </section>
  );
}

export default PaymentDetails;
