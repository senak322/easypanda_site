import axios from "axios";
import { baseCurrencyUrl } from "./config";

const baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:3001" : "";

export async function getExchangeRate(
  sendCurrency: string,
  receiveCurrency: string
) {
  try {
    const toLowerSend = sendCurrency.toLowerCase();
    const toLowerReceive = receiveCurrency.toLowerCase();
    const response = await axios.get(`${baseCurrencyUrl + toLowerSend}.json`);
    const rate = response.data[toLowerSend][toLowerReceive];
    return rate;
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
  }
}

export const postLogin = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${baseURL}/api/auth/login`, {
      username,
      password,
    });
    const token = response.data.access_token;
    return token;
  } catch (error) {
    console.error("Ошибка входа:", error);
  }
};
