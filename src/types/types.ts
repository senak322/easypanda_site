export interface Banks {
  [key: string]: string[];
}

export interface Bank {
  name: string;
  icon: string;
}

export type Currency = "rub" | "cny" | "uah";

export interface IBankData {
  card: string;
  owner: string;
}

export interface IPayData {
  [key: string]: IBankData;
}

export interface FileDetails {
  file?: File;
  name: string;
  size: number;
  lastModified: number;
}

export interface Order {
  _id: string; // Уникальный идентификатор заказа
  sendCurrency: string; // Валюта отправки
  receiveCurrency: string; // Валюта получения
  sendAmount: number; // Сумма отправки
  receiveAmount: number; // Сумма получения
  sendBank: string; // Банк отправителя
  receiveBank: string; // Банк получателя
  ownerName: string; // Имя владельца заказа
  ownerData: string; // Данные владельца (номер счета или фото)
  qrCodeFileData?: FileDetails; // Детали файла QR-кода, если есть
  status:
    | "pending"
    | "waitingAccept"
    | "completed"
    | "closed"
    | "cancelledByTimer"; // Статус заказа
  hash: string;
  createdAt: string; // Дата создания заказа
  expiresAt: string; // Дата истечения заказа
  files: string[]
  fileUrls: string[]
}

// export interface OrderResponse {
//   id: string;
//   message: string; // Сообщение о результате операции
//   status: string; // Новый статус заказа
// }

// export interface CreateOrderRequest {
//   sendCurrency: string; // Валюта отправки
//   receiveCurrency: string; // Валюта получения
//   sendAmount: number; // Сумма отправки
//   receiveAmount: number; // Сумма получения
//   sendBank: string; // Банк отправителя
//   receiveBank: string; // Банк получателя
//   ownerName: string; // Имя владельца заказа
//   ownerData: string | number; // Данные владельца (номер счета или фото)
//   qrCodeFileData?: FileDetails; // Детали файла QR-кода, если есть
//   hash: string;
// }

export interface AuthState {
  isAuthenticated: boolean;
  tokenChecked: boolean;
  token: string;
}

export interface RootState {
  auth: AuthState;
}
