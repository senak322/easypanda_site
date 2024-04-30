import { useEffect, useState } from "react";
import { Order } from "../../types/types"; // импортируем тип Order

interface TimerProps {
  order: Order;
}

export default function Timer({ order }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(
    (new Date(order.expiresAt).getTime() - Date.now()) / 1000
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft <= 0) {
          clearInterval(timer);
          return 0;
        }
        return timeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTimeLeft = () => {
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = Math.floor(timeLeft % 60);

    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  return (
    <div>
      {order?.status === "pending" && timeLeft !== 0 && (
        <p>Оставшееся время для оплаты: <span className="fw-semibold">{formatTimeLeft()}</span></p>
      )}
    </div>
  );
}
