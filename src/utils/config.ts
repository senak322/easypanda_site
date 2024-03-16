export const banks: {
  [key in "rub" | "cny" | "uah" | "gel" | "idr"]: string[];
} = {
  rub: ["SBER"],
  cny: ["WeChat", "AliPay"],
  uah: ["Mono"],
  gel: ["BOG"],
  idr: ["Mega"],
};

export const allCurrencies = ["RUB", "CNY", "IDR", "GEL"];
