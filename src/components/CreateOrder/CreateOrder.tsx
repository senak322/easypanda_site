import "./CreateOrder.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Rools from "../Rools/Rools";
import { orderLi } from "../../utils/config";
import NextStepBtn from "../NextStepBtn/NextStepBtn";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

interface CreateOrderProps {
  handlePaidOrder: () => void;
  handleCloseOrder: () => void;
}

function CreateOrder({
  handlePaidOrder,
  handleCloseOrder,
}: CreateOrderProps): JSX.Element {
  const {
    instances,
    sumGive,
    sumReceive,
    firstName,
    lastName,
    bankAccount,
    uploadedReceiveFileDetails,
  } = useSelector((state: RootState) => state.currency);

  const accountData =
    instances.receive.selectedCurrency === "RUB" ||
    instances.receive.selectedCurrency === "UAH"
      ? "Номер карты"
      : instances.receive.selectedCurrency === "CNY" &&
        instances.receive.selectedBank === "AliPay"
      ? "Аккаунт Alipay"
      : "";

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
          {accountData} получателя:{" "}
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
      <div>
        <h4>Реквизиты для оплаты</h4>
        <p>Тут номер карты</p>
      </div>
      <div>
        <h4>Прикрепите чек об оплате</h4>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Загрузить чек
          <VisuallyHiddenInput type="file" onChange={handleFileChange} />
        </Button>
      </div>
      <Rools title="Важно" list={orderLi} />
      <div className="order__btn-container">
        <NextStepBtn
          handleNextStep={handlePaidOrder}
          isDisabled={false}
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
