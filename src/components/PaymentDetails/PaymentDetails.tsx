import "./PaymentDetails.scss";
import { Alert, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import NextStepBtn from "../NextStepBtn/NextStepBtn";
import Rools from "../Rools/Rools";
import { paymentLi } from "../../utils/config";
import AddFileBtn from "../AddFileBtn/AddFileBtn";
import FileInfo from "../FileInfo/FileInfo";
import { useCallback } from "react";
import { useCreateOrderMutation } from "../../services/api";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface PaymentDetailsProps {
  isDisabled: boolean;
  // handleCreateOrder: () => void;
  handleBackStep: () => void;
  handleChangeFirstName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeLastName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeBankAccount: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  step: number;
}

function PaymentDetails({
  isDisabled,
  // handleCreateOrder,
  handleChangeFirstName,
  handleChangeLastName,
  handleChangeBankAccount,
  // handleFileChange,
  handleBackStep,
  step,
}: PaymentDetailsProps) {
  const {
    instances,
    firstName,
    lastName,
    bankAccount,
    uploadedReceiveFileDetails,
    alert,
    sumGive,
    sumReceive,
  } = useSelector((state: RootState) => state.currency);
  const navigate = useNavigate();
  const [createOrder, { isLoading, isSuccess, isError, error }] =
    useCreateOrderMutation();

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

  const handleCreateOrder = useCallback(async () => {
    const orderDetails = {
      userCookies: "",
      sendCurrency: instances.give.selectedCurrency,
      receiveCurrency: instances.receive.selectedCurrency,
      sendAmount: sumGive,
      receiveAmount: sumReceive,
      sendBank: instances.give.selectedBank,
      receiveBank: instances.receive.selectedBank,
      ownerName: firstName + " " + lastName,
      ownerData: bankAccount
        ? bankAccount
        : "Данные получателя отправлены в формате фото",
      qrCodeFileData: uploadedReceiveFileDetails,
    };
    if (orderDetails) {
      await createOrder(orderDetails).then((res) => {
        console.log(res);
      });
    }
  }, [
    bankAccount,
    createOrder,
    firstName,
    instances.give.selectedBank,
    instances.give.selectedCurrency,
    instances.receive.selectedBank,
    instances.receive.selectedCurrency,
    lastName,
    sumGive,
    sumReceive,
    uploadedReceiveFileDetails,
  ]);

  if (isLoading) return <LoadingOutlined />;
  if (isSuccess) {
    navigate("/order");
  }

  if (isError) return <p>Error: {error.toString()}</p>;

  return (
    <section className="payment">
      <div className="payment__container">
        <h2 className="mb-4">Укажите реквизиты получателя</h2>
        <div className="payment__wrapper">
          {/* <div className="payment__input-container"> */}
          <TextField
            id="outlined-basic"
            label="Имя"
            variant="outlined"
            value={firstName}
            onChange={handleChangeFirstName}
            disabled={step > 2}
          />
          <TextField
            id="outlined-basic"
            label="Фамилия"
            variant="outlined"
            value={lastName}
            onChange={handleChangeLastName}
            disabled={step > 2}
          />
          <div className="payment__input-container">
            {accountData && (
              <TextField
                id="outlined-basic"
                label={accountData}
                variant="outlined"
                value={bankAccount}
                onChange={handleChangeBankAccount}
                disabled={step > 2}
              />
            )}
            {accountData && accountData !== "Номер карты" && (
              <p className="payment__or">или</p>
            )}
            {instances.receive.selectedCurrency === "CNY" && (
              <AddFileBtn instanceId="receive" isDisabled={step > 2} />
            )}
          </div>
          {uploadedReceiveFileDetails && (
            <FileInfo details={uploadedReceiveFileDetails} />
          )}
          {alert.receive.message && (
            <Alert severity={alert.receive.severity}>
              {alert.receive.message}
            </Alert>
          )}
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
        <div className="payment__btn-container">
          <NextStepBtn
            handleNextStep={handleCreateOrder}
            isDisabled={isDisabled || step > 2}
            title="Создать заявку"
            color="primary"
          />
          <NextStepBtn
            handleNextStep={handleBackStep}
            isDisabled={step > 2}
            title="Изменить детали"
            color="success"
          />
        </div>
      </div>
    </section>
  );
}

export default PaymentDetails;
