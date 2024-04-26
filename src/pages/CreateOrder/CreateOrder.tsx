import { useCallback, useEffect } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { useGetOrderQuery } from "../../services/api";
import { LoadingOutlined } from "@ant-design/icons";

function CreateOrder(): JSX.Element {
  const {
    uploadedPaidFileDetails,
    uploadedReceiveFileDetails,
    alert,
  } = useSelector((state: RootState) => state.currency);
 

  const navigate = useNavigate();
  const { hash } = useParams();
  const { data: orderResponse, isLoading, error } = useGetOrderQuery(hash);
  console.log(orderResponse);
  

  const handlePaidOrder = useCallback(() => {}, []);

  const handleCloseOrder = useCallback(() => {
    navigate("/");
  }, [navigate]);
  
  useEffect(() => {
    if (!orderResponse) {
      console.error("Order not found");
    }
  }, [orderResponse]);

  if (isLoading) return <LoadingOutlined />;
  if (error) return <div>Error: {error.toString()}</div>;
  if (!orderResponse) return <div>Order not found</div>; 

  const order = orderResponse.order;
  // console.log(order);
  // const sendBank = order.sendBank.toLowerCase();
  

  const accountData =
    order.receiveCurrency === "RUB" || order.receiveCurrency === "UAH"
      ? "Номер карты"
      : order.receiveCurrency === "CNY" && order.receiveBank === "AliPay"
      ? "Аккаунт Alipay"
      : "";

  const accountGiveData =
    order.sendCurrency === "RUB" || order.sendCurrency === "UAH"
      ? "Номер карты"
      : order.sendCurrency === "CNY" && order.sendBank === "AliPay"
      ? "Аккаунт Alipay"
      : "";

  const dataForPay: IBankData =
    payData[order.sendBank.toLowerCase()];
  

  return (
    <section className="order">
      <h2 className="mb-3">Ордер <span className="order__span">{hash}</span> создан</h2>

      <ul className="order__info">
        <li>
          Вы отправляете:{" "}
          <span className="order__span">
            {order.sendAmount} {order.sendCurrency}
          </span>{" "}
          на{" "}
          <img
            src={`../images/${order.sendBank.toLowerCase()}.png`}
            alt={order.sendBank}
            className="order__currency-img"
          />
          {order.sendBank}
        </li>
        <li>
          Вы получаете:{" "}
          <span className="order__span">
            {order.receiveAmount} {order.receiveCurrency}
          </span>{" "}
          на{" "}
          <img
            src={`../images/${order.receiveBank.toLowerCase()}.png`}
            alt={order.receiveBank}
            className="order__currency-img"
          />
          {order.receiveBank}
        </li>
        <li>
          Получатель: <span className="order__span">{order.ownerName}</span>
        </li>
        <li>
          {accountData && `${accountData} получателя: `}
          <span className="order__span">
            {order.qrCodeFileData
              ? "Данные получателя отправлены в формате фото"
              : order.ownerData}
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
              src={`../images/${order.sendBank.toLowerCase()}.png`}
              alt={order.sendBank}
              className="order__currency-img"
            />
            <span className="order__span">{order.sendBank}</span>
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
          Сумма к оплате:&nbsp;
            <span className="order__span">
            {order.sendAmount} {order.sendCurrency}
            </span>
          </li>
        </ul>
      </div>
      <p>Статус заказа: {order.status}</p>
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
