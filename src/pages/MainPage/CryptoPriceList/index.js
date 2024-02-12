import React, { useEffect, useState } from "react";
import classes from "./CryptoPriceList.module.scss";
import Coin from "../../../components/Coin/Coin";
import cryptoStore from "../../../store/cryproStore";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const CryptoPriceList = observer(() => {
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    cryptoStore.fetchCoins();
  }, []);

  const filteredCoins = (coins, searchInput) => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchInput.toLowerCase())
    );
  };

  return (
    <>
      <div className={classes.input_container}>
        <input
          className={classes.input_field}
          type="text"
          placeholder="Search Crypto..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
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
          {filteredCoins(cryptoStore.coins, searchInput) < 1 ? (
            <div className={classes.crypto_empty_results}>
              <h3>No Search Results Found!</h3>
              <p>
                Please check you search spellings and remember this tracker only
                keeps record of the top 100 cryptocurrencies
              </p>
            </div>
          ) : (
            filteredCoins(cryptoStore.coins, searchInput).map((coin) => {
              return (
                <Link key={coin.id} to={`/coin/${coin.id}`}>
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
                </Link>
              );
            })
          )}
        </div>
      </div>
    </>
  );
});

export default CryptoPriceList;
