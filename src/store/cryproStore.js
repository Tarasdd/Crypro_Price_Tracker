// cryptoStore.js
import { makeAutoObservable } from "mobx";

class CryptoStore {
  coins = [];
  chartDays = [
    {
      label: "24 Hours",
      value: 1,
    },
    {
      label: "30 Days",
      value: 30,
    },
    {
      label: "3 Months",
      value: 90,
    },
    {
      label: "1 Year",
      value: 365,
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  // Fetch List of Coins
  fetchCoins() {
    return fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched coins data:", data);
        this.setCoins(data);
      })
      .catch((error) => console.error("Error fetching coins:", error));
  }

  setCoins(coins) {
    this.coins = coins;
  }

  getChartDays() {
    return this.chartDays;
  }
}

const cryptoStore = new CryptoStore();

export default cryptoStore;

