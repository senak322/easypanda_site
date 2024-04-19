import { useCallback } from "react";
import "./CreateOrder.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Rools from "../../components/Rools/Rools";
import { orderLi, payData } from "../../utils/config";
import NextStepBtn from "../../components/NextStepBtn/NextStepBtn";
import { Alert } from "@mui/material";
import { IBankData } from "../../types/types";
import AddFileBtn from "../../components/AddFileBtn/AddFileBtn";
import FileInfo from "../../components/FileInfo/FileInfo";
import { useNavigate } from "react-router-dom";

function CreateOrder(): JSX.Element {
  const {
    instances,
    sumGive,
    sumReceive,
    firstName,
    lastName,
    bankAccount,
    uploadedPaidFileDetails,
    uploadedReceiveFileDetails,
    alert,
  } = useSelector((state: RootState) => state.currency);

  const navigate = useNavigate();

  // const appDispatch = useAppDispatch()

  const accountData =
    instances.receive.selectedCurrency === "RUB" ||
    instances.receive.selectedCurrency === "UAH"
      ? "Номер карты"
      : instances.receive.selectedCurrency === "CNY" &&
        instances.receive.selectedBank === "AliPay"
      ? "Аккаунт Alipay"
      : "";

  const accountGiveData =
    instances.give.selectedCurrency === "RUB" ||
    instances.give.selectedCurrency === "UAH"
      ? "Номер карты"
      : instances.give.selectedCurrency === "CNY" &&
        instances.give.selectedBank === "AliPay"
      ? "Аккаунт Alipay"
      : "";

  const dataForPay: IBankData =
    payData[instances.give.selectedBank.toLocaleLowerCase()];

  const handlePaidOrder = useCallback(() => {}, []);

  const handleCloseOrder = useCallback(() => {
    navigate("/");
  }, [navigate]);


  return (
    <section className="order">
      <h2 className="mb-3">Ордер № создан</h2>

      <ul className="order__info">
        <li>
          Вы отправляете:{" "}
          <span className="order__span">
            {sumGive} {instances.give.selectedCurrency}
          </span>{" "}
          на{" "}
          <img
            src={instances.give.selectedBankIcon}
            alt={instances.give.selectedBank}
            className="order__currency-img"
          />
          {instances.give.selectedBank}
        </li>
        <li>
          Вы получаете:{" "}
          <span className="order__span">
            {sumReceive} {instances.receive.selectedCurrency}
          </span>{" "}
          на{" "}
          <img
            src={instances.receive.selectedBankIcon}
            alt={instances.receive.selectedBank}
            className="order__currency-img"
          />
          {instances.receive.selectedBank}
        </li>
        <li>
          Получатель:{" "}
          <span className="order__span">
            {firstName} {lastName}
          </span>
        </li>
        <li>
          {accountData && `${accountData} получателя: `}
          <span className="order__span">
            {uploadedReceiveFileDetails
              ? "Данные получателя отправлены в формате фото"
              : bankAccount}
          </span>
        </li>
      </ul>
      <div>
        <p>Таймер</p>
      </div>
      <div className="order__info d-flex align-items-center flex-column">
        <h4 className="mb-4">Реквизиты для оплаты</h4>
        <ul className="order__data-container">
          <li className="m-0">
            Банк:{" "}
            <img
              src={instances.give.selectedBankIcon}
              alt={instances.give.selectedBank}
              className="order__currency-img"
            />
            <span className="order__span">{instances.give.selectedBank}</span>
          </li>
          <li className="m-0 d-flex">
            {dataForPay.card === "QR" ? (
              <img
                src={"../../images/qrwechat.jpg"}
                alt={dataForPay.card}
                className="order__img-qr"
              />
            ) : (
              <>
                <p className="m-0">{`${accountGiveData}:`}</p>
                <span className="order__span">&nbsp;{dataForPay.card}</span>
              </>
            )}
          </li>
          <li className="m-0">
            {dataForPay.owner && "Получатель: "}
            <span className="order__span">{dataForPay.owner}</span>
          </li>
          <li className="m-0">
            {dataForPay.owner && "Сумма к оплате: "}
            <span className="order__span">
              {sumGive} {instances.give.selectedCurrency}
            </span>
          </li>
        </ul>
      </div>
      <div className="d-flex align-items-center order__file-container">
        <h4 className="mx-3 my-2 order__file-header">
          Прикрепите чек об оплате
        </h4>
        <AddFileBtn instanceId="paid" isDisabled={false} />
        {uploadedPaidFileDetails && (
          <FileInfo details={uploadedPaidFileDetails} />
        )}
        {alert.paid.message && (
          <Alert severity={alert.paid.severity}>{alert.paid.message}</Alert>
        )}
      </div>
      <Rools title="Важно" list={orderLi} />
      <div className="order__btn-container">
        <NextStepBtn
          handleNextStep={handlePaidOrder}
          isDisabled={!uploadedPaidFileDetails}
          title="Заказ оплачен"
          color="success"
        />
        <NextStepBtn
          handleNextStep={handleCloseOrder}
          isDisabled={false}
          title="Закрыть заявку"
          color="error"
        />
      </div>
    </section>
  );
}

export default CreateOrder;
