export interface Banks {
  [key: string]: string[];
}

export interface Bank {
  name: string;
  icon: string;
}

export type Currency = "rub" | "cny" | "uah";
