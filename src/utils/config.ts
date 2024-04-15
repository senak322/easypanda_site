export const banks: {
  [key in "rub" | "cny" | "uah"]: string[];
} = {
  rub: ["SBER"],
  cny: ["WeChat", "AliPay"],
  uah: ["Mono"],
  // gel: ["BOG"],
  // idr: ["Mega"],
};

export const roolsLi = [
  "Укажите валюты обмена, сумму и удобный способ отправки и получения",
  `После указания всех данных нажмите кнопку "Следующий шаг", чтобы указать данные получателя и получить реквизиты для оплаты.`,
  "Внесите указанную Вами сумму по полученным реквизитам и прикрепите скриншот об оплате.",
  `Нажмите кнопку "Оплачено" и ожидайте получение средств после подтверждения от Администратора`,
];

export const paymentLi = [
  "Пожалуйста, укажите корректные данные получателя в формате Ivan Ivanov или на языке страны получения",
];

export const allCurrencies = ["RUB", "CNY", "UAH"];

export const baseCurrencyUrl =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";

export const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg"];
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
