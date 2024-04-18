// import sber from "../images/sber.png"
import { Bank, Currency, IPayData } from "../types/types";

export const banks: Record<Currency, Bank[]> = {
  rub: [{ name: "SBER", icon: "../../images/sber.png" }],
  cny: [
    { name: "AliPay", icon: "../../images/alipay.png" },
    { name: "WeChat", icon: "../../images/wechat.png" },
  ],
  uah: [{ name: "Mono", icon: "../../images/mono.png" }],
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

export const orderLi = [
  "Принимается оплата только внутри банка, карту которого Вы выбрали",
  "Комментарий не писать",
  "Время на оплату 30 минут, если заказ не будет оплачен заявка автоматически закрывается",
  `После оплаты прикрепите чек и нажмите кнопку "Заказ оплачен"`,
  "Далее после того, как вы оплатите заказ мы переведем средства на Ваш счет",
];

export const allCurrencies = ["RUB", "CNY", "UAH"];

export const baseCurrencyUrl =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";

export const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg"];
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export const payData: IPayData = {
  sber: {
    card: "2202206296854099",
    owner: "Александр В.",
  },
  alipay: {
    card: "13136022300",
    owner: "C. YURII или CHERNIAIEV YURII, если нужно ввести фамилию полностью",
  },
  wechat: {
    card: "QR",
    owner: "CHERNIAIEV YURII",
  },
  mono: {
    card: "5375411508576258",
    owner: "",
  },
};
