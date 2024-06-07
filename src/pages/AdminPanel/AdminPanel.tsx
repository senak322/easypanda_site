import React, { useEffect, useState } from "react";
import {
  useGetWaitingOrdersQuery,
  useCloseOrderMutation,
  useApproveOrderMutation,
  useGetApprovedOrdersMutation,
} from "../../store/slices/apiSlice";
// import { useNavigate } from "react-router-dom";
import { Button, Alert, CircularProgress } from "@mui/material";
import "./AdminPanel.scss";
import { Order } from "../../types/types";

const AdminPanel: React.FC = () => {
  const {
    data: waitingOrders,
    error,
    isLoading,
    refetch,
  } = useGetWaitingOrdersQuery({});
  const [closeOrder] = useCloseOrderMutation();
  const [approveOrder] = useApproveOrderMutation();
  const [getApprovedOrders] = useGetApprovedOrdersMutation();
  const [approvedOrders, setApprovedOrders] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      console.error("Failed to fetch waiting orders:", error);
    }
  }, [error]);

  const handleApproveOrder = async (id: any) => {
    try {
      // console.log(order._id);

      await approveOrder(id).unwrap();
      refetch();
    } catch (err) {
      console.error("Failed to accept order:", err);
    }
  };

  const handleCloseOrder = async (hash: string) => {
    try {
      await closeOrder(hash).unwrap();
      refetch();
    } catch (err) {
      console.error("Failed to close order:", err);
    }
  };

  const handleGetApprovedOrders = async () => {
    try {
      const orders = await getApprovedOrders({}).unwrap();
      setApprovedOrders(orders);
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleString("ru-RU", options);
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">Error: {error.toString()}</Alert>;

  return (
    <div className="admin-panel">
      <h2>Заявки, ожидающие подтверждения</h2>
      {waitingOrders?.length ? (
        <ul className="order-list">
          {waitingOrders.map((order: Order) => (
            <li key={order._id} className="order-item">
              <div className="order-info">
                <p>Hash: {order.hash}</p>
                <p>Дата создания: {order.createdAt}</p>
                <p>
                  К отправке: {order.sendAmount} {order.sendCurrency} на{" "}
                  {order.sendBank}
                </p>
                <p>
                  К получению: {order.receiveAmount} {order.receiveCurrency} на{" "}
                  {order.receiveBank}
                </p>
                <p>Статус: {order.status}</p>
                <p>Получатель: {order.ownerName}</p>
                <p>Реквизиты получателя: {order.ownerData}</p>
                <div>
                  {order.files && order.files.length > 0 && (
                    <div>
                      <p>Документы по заявке:</p>
                      <ul className="order-files">
                        {order.fileUrls.map((file, index) => (
                          <li className="order-li" key={index}>
                            <img className="order-img" src={file} alt="фото" />
                            <a
                              href={file}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Ссылка
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="order-actions">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleApproveOrder(order._id)}
                >
                  Подтвердить
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleCloseOrder(order.hash)}
                >
                  Закрыть
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Нет заявок, ожидающих подтверждения.</p>
      )}
      <h2>Подтвержденные заявки</h2>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGetApprovedOrders}
        className="mb-3"
      >
        Получить подтвержденные заявки
      </Button>

      {approvedOrders && (
        <ul className="order-list">
          {approvedOrders.map((order, index) => {
            // const date = new Date(order.createdAt).getTime()
            return (
              <li key={order._id} className="order-item">
                <div className="order-info">
                  <p>№ {index + 1}</p>
                  <p>Hash: {order.hash}</p>
                  <p>Дата создания: {formatDate(order.createdAt)}</p>
                  <p>
                    К отправке: {order.sendAmount} {order.sendCurrency} на{" "}
                    {order.sendBank}
                  </p>
                  <p>
                    К получению: {order.receiveAmount} {order.receiveCurrency}{" "}
                    на {order.receiveBank}
                  </p>
                  <p>Статус: {order.status}</p>{" "}
                  <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleCloseOrder(order.hash)}
                >
                  Закрыть
                </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AdminPanel;
