import { useCallback, useEffect, useState } from "react";
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
import {
  useAcceptOrderMutation,
  useCloseOrderMutation,
  useGetOrderQuery,
} from "../../store/slices/apiSlice";
import { LoadingOutlined } from "@ant-design/icons";
import { Order } from "../../types/types";
import Timer from "../../components/Timer/Timer";
// import { useAppDispatch } from "../../hooks/useAppDispatch";

function CreateOrder(): JSX.Element {
  const { uploadedPaidFileDetails, alert } = useSelector(
    (state: RootState) => state.currency
  );

  const [paidFile, setPaidFile] = useState<File | null>(null); // Добавляем состояние для файла чека
  const navigate = useNavigate();
  const { hash } = useParams();
  // const appDispatch = useAppDispatch()
  const {
    data: orderResponse,
    isLoading,
    error,
    refetch,
  } = useGetOrderQuery(hash, {
    skip: !hash, // Запрос не выполняется, если hash не задан
  });

  // console.log(orderResponse);
  const [statusFromApi, setStatusFromApi] = useState(
    orderResponse?.order?.status || ""
  );

  const [closeOrder] = useCloseOrderMutation();
  const [acceptOrder] = useAcceptOrderMutation();

  const handleFileSelect = useCallback((file: File) => {
    setPaidFile(file);
  }, []);

  const handlePaidOrder = useCallback(async () => {
    if (!paidFile) {
      console.error("No file selected for payment proof");
      return;
    }
    const formData = new FormData();
    formData.append("file", paidFile);
    try {
      const response = await acceptOrder({ hash, formData }).unwrap();
      // console.log("Order accepted response:", response);
      if (response && response.status) {
        setStatusFromApi(response.status);
      }

      refetch();
    } catch (err) {
      console.error("Failed to accept the order:", err);
    }
  }, [acceptOrder, paidFile, hash, refetch]);

  const handleCloseOrder = async () => {
    try {
      await closeOrder(hash).unwrap();
      setStatusFromApi("closed");
      navigate("/");
    } catch (error) {
      console.error("Failed to close the order:", error);
    }
  };
  // }, [navigate]);

  // useEffect(() => {
  //   if (orderResponse) {
  //     // console.log("Order found:", orderResponse);
  //   } else if (!isLoading && error) {
  //     console.error("Order not found:", error);
  //     // alert("Заказ не найден");
  //   }
  // }, [orderResponse, isLoading, error, alert]);

  // Обновление статуса заказа каждые 2 минуты
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 120000); // 120000 миллисекунд = 2 минуты

    return () => clearInterval(interval);
  }, [refetch, statusFromApi]);

  useEffect(() => {
    if (orderResponse?.order && orderResponse.order.status !== statusFromApi) {
      setStatusFromApi(orderResponse.order.status);
    }
  }, [orderResponse?.order, statusFromApi]);

  if (isLoading) return <LoadingOutlined />;
  if (error) return <div>Error: {error.toString()}</div>;
  if (!orderResponse) return <div>Order not found</div>;

  const order: Order = orderResponse.order;
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

  const dataForPay: IBankData = payData[order.sendBank.toLowerCase()];

  const bgColor =
    order.status === "pending" || order.status === "waitingAccept"
      ? "yellow"
      : order.status === "closed" || order.status === "cancelledByTimer"
      ? "red"
      : "green";

  const orderStatus =
    statusFromApi === "pending"
      ? "Ожидает оплаты"
      : statusFromApi === "waitingApprove"
      ? "Ожидает подтверждения"
      : statusFromApi === "approved"
      ? "Завершен"
      : statusFromApi === "closed"
      ? "Отменен"
      : "Отменен по таймеру";

  return (
    <section className="order">
      <h2 className="mb-3">
        Ордер <span className="order__span">{hash}</span> создан
      </h2>
      <p className="d-flex align-items-center gap-2">
        Статус заказа:{" "}
        <span
          className="order__status"
          style={{
            backgroundColor: `${bgColor}`,
            boxShadow: `0 0 8px ${bgColor}`,
          }}
        ></span>
        <span className="fw-bolder">{orderStatus}</span>
      </p>
      <Timer order={order} />
      <div className="order__container">
        <div className="order__info">
          <h4 className="mb-4">Данные ордера</h4>
          <ul className="order__data-container">
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
              {dataForPay?.card === "QR" ? (
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
      </div>
      <div className="d-flex align-items-center order__file-container">
        <h4 className="mx-3 my-2 order__file-header">
          {orderStatus === "Ожидает оплаты"
            ? "Прикрепите чек об оплате"
            : `Чек получен.
Заказ будет завершён после подтверждения администратором`}
        </h4>
        {orderStatus === "Ожидает оплаты" && (
          <AddFileBtn
            instanceId="paid"
            isDisabled={false}
            onFileSelect={handleFileSelect}
          />
        )}
        {uploadedPaidFileDetails && orderStatus === "Ожидает оплаты" && (
          <FileInfo details={uploadedPaidFileDetails} />
        )}
        {alert.paid.message && orderStatus === "Ожидает оплаты" && (
          <Alert severity={alert.paid.severity}>{alert.paid.message}</Alert>
        )}
      </div>
      <Rools title="Важно" list={orderLi} />
      <div className="order__btn-container">
        <NextStepBtn
          handleNextStep={handlePaidOrder}
          isDisabled={!uploadedPaidFileDetails || orderStatus !== "Ожидает оплаты"}
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
