import React from "react";
import classes from "./Coin.module.scss";

const Coin = ({
  symbol,
  name,
  image,
  price,
  volume,
  marketCap,
  priceChange,
}) => {
  return (
    <div className={classes.container}>
      <div className={classes.block}>
        <div className={classes.coin}>
          <div><img src={image} alt="crypto" /> <p>{name}</p></div>
          <p>{symbol}</p>
        </div>
        <div className={classes.coin_info}>
          <p className={classes.price}>{price}</p>
          <p>{priceChange}</p>
          <p>{volume}</p>
          <p>{marketCap}</p>
        </div>
      </div>
    </div>
  );
};

export default Coin;
