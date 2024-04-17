import "./CreateOrder.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface CreateOrderProps {
  handleCloseOrder: () => void;
}

function CreateOrder({ handleCloseOrder }: CreateOrderProps): JSX.Element {
  const {
    instances,
    sumGive,
    sumReceive,
    firstName,
    lastName,
    bankAccount,
    uploadedFileDetails,
  } = useSelector((state: RootState) => state.currency);

  const accountData =
    instances.receive.selectedCurrency === "RUB" ||
    instances.receive.selectedCurrency === "UAH"
      ? "Номер карты"
      : instances.receive.selectedCurrency === "CNY" &&
        instances.receive.selectedBank === "AliPay"
      ? "Аккаунт Alipay"
      : "";
  return (
    <section className="order">
      <h2 className="mb-3">Ордер № создан</h2>
      <div>
        <ul className="order__info">
          <li>
            Вы отправляете: {sumGive} {instances.give.selectedCurrency} на{" "}
            <img src={instances.give.selectedBankIcon} alt={instances.give.selectedBank} className="order__currency-img"/>{instances.give.selectedBank}
          </li>
          <li>
            Вы получаете: {sumReceive} {instances.receive.selectedCurrency} на{" "}
            <img src={instances.receive.selectedBankIcon} alt={instances.receive.selectedBank} className="order__currency-img"/>{instances.receive.selectedBank}
          </li>
          <li>
            Получатель: {firstName} {lastName}
          </li>
          <li>
            {accountData} получателя: {bankAccount}{" "}
            {uploadedFileDetails
              ? "Данные получателя отправлены в формате фото"
              : bankAccount}
          </li>
        </ul>
      </div>
    </section>
  );
}

export default CreateOrder;
