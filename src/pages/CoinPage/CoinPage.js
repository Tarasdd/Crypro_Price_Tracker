import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
  }, [id]);

  console.log(coin);

  return (
    <div>
       {coin && coin.name && <h1>{coin.name}</h1>}
    </div>
  );
};

export default CoinPage;


