import React, { useEffect, useState } from "react";
import classes from "./CryptoPriceList.module.scss";
import axios from "axios";
import Coin from "../../../components/Coin/Coin";

const CryptoPriceList = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=40&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
        console.log("data: ", res.data);
      })
      .catch((e) => console.error("Error: ", e));
  }, []);

  return (
    <div className={classes.table_container}>
      <div className={classes.table_block}>
        <div className={classes.coin}>
          <p>Name</p>
          <p>Symbol</p>
        </div>
        <div className={classes.coin_info}>
          <p>Price</p>
          <p>24h Change</p>
          <p>24h Volume</p>
          <p>Market Cap</p>
        </div>
      </div>
      <div className={classes.line}></div>

      <div className={classes.coin_display}>
        {coins.map((coin) => (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            price={coin.current_price}
            volume={coin.total_volume}
            marketCap={coin.market_cap}
            priceChange={coin.price_change_percentage_24h}
          />
        ))}
      </div>
    </div>
  );
};

export default CryptoPriceList;
