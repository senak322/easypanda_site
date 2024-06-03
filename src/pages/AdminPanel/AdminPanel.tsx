import React, { useEffect } from 'react';
import { useGetWaitingOrdersQuery, useCloseOrderMutation, useAcceptOrderMutation } from '../../store/slices/apiSlice';
import { useNavigate } from 'react-router-dom';
import { Button, Alert, CircularProgress } from '@mui/material';
import './AdminPanel.scss';
import { Order } from '../../types/types';

const AdminPanel: React.FC = () => {
  const { data: waitingOrders, error, isLoading, refetch } = useGetWaitingOrdersQuery({});
  const [closeOrder] = useCloseOrderMutation();
  // const [acceptOrder] = useAcceptOrderMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      console.error('Failed to fetch waiting orders:', error);
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
      console.error('Failed to close order:', err);
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
                <p>Send Amount: {order.sendAmount} {order.sendCurrency}</p>
                <p>Receive Amount: {order.receiveAmount} {order.receiveCurrency}</p>
                <p>Status: {order.status}</p>
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
    </div>
  );
};

export default AdminPanel;

