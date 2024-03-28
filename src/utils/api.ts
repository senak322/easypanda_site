import axios from "axios";
import { baseCurrencyUrl } from "./config";

export async function getExchangeRate(
  sendCurrency: string,
  receiveCurrency: string
) {
  try {
    const response = await axios.get(`${baseCurrencyUrl + sendCurrency}.json`);
    const rate = response.data[sendCurrency][receiveCurrency];
    console.log(rate);
    return rate;
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
  }
}
