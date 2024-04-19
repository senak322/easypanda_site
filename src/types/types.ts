export interface Banks {
  [key: string]: string[];
}

export interface Bank {
  name: string;
  icon: string;
}

export type Currency = "rub" | "cny" | "uah";

export interface IBankData {
  card: string
  owner: string
}

export interface IPayData {
  [key: string]: IBankData
}

export interface FileDetails {
  name: string;
  size: number;
  lastModified: number;
}
