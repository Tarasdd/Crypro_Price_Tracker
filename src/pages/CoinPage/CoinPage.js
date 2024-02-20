import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinChartData from "./CoinChartData/CoinChartData";
import classes from "./CoinPage.module.scss"

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);

  const fetchCoin = async () => {
    try {
      const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
      setCoin(data);
    } catch (error) {
      console.error(`Error fetching coin ${id}:`, error);
    }
  }

  useEffect(() => {
    fetchCoin();
  }, []);

  const firstThreeSentences = coin?.description?.en?.match(/[^.!?]+(?:[.!?]|$)/g)?.slice(0, 3);


  console.log("Coin data: ", coin);

  return (
    <div className={classes.container}>
      <div className={classes.sisebar}>
        <img src={coin?.image.large} alt={coin?.name} height="200"/>
        <h1>{coin?.name}</h1>
        <h3>{firstThreeSentences}</h3>

        <div className={classes.market_data}>
          <span>Rank: {coin?.market_cap_rank}</span>
        </div>
      </div>

      {/* Chart Coin Data */}
      <>
        {coin && <CoinChartData coin={coin} />}
      </>
    </div>
  );
};

export default CoinPage;