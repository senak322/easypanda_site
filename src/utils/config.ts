export const banks: {
  [key in "rub" | "cny" | "uah" | "gel" | "idr"]: string[];
} = {
  rub: ["sber"],
  cny: ["wechat", "alipay"],
  uah: ["mono"],
  gel: ["bog"],
  idr: ["mega"],
};

export const allCurrencies = ["RUB", "CNY", "IDR", "GEL"];
