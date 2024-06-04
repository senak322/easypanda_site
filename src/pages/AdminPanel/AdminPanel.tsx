import React, { useEffect } from "react";
import {
  useGetWaitingOrdersQuery,
  useCloseOrderMutation,
  useAcceptOrderMutation,
} from "../../store/slices/apiSlice";
import { useNavigate } from "react-router-dom";
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
  // const [acceptOrder] = useAcceptOrderMutation();
  // const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      console.error("Failed to fetch waiting orders:", error);
    }
  }, [error]);

  // const handleAcceptOrder = async (hash: string) => {
  //   try {
  //     await acceptOrder({ hash }).unwrap();
  //     refetch();
  //   } catch (err) {
  //     console.error('Failed to accept order:', err);
  //   }
  // };

  const handleCloseOrder = async (hash: string) => {
    try {
      await closeOrder(hash).unwrap();
      refetch();
    } catch (err) {
      console.error("Failed to close order:", err);
    }
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
                  // onClick={() => handleAcceptOrder(order.hash)}
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
      <button>Получить подтвержденные заявки</button>
    </div>
  );
};

export default AdminPanel;
