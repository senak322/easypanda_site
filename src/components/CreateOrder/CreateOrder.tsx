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
  return (
    <section className="order">
      <h2>Ордер № создан</h2>
      <div>
        <ul className="order__info">
          <li>
            Вы отправляете: {sumGive} {instances.give.selectedCurrency} на{" "}
            {instances.give.selectedBank}
          </li>
          <li>
            Вы получаете: {sumReceive} {instances.receive.selectedCurrency} на{" "}
            {instances.receive.selectedBank}
          </li>
          <li>
            Получатель: {firstName} {lastName}
          </li>
          <li>
            Банк: {instances.receive.selectedBank}{" "}
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
