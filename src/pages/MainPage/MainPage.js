import React from "react";
import CryptoPrice from "./CryptoPriceList";
import MainPageTitle from "./MainPageTitle";

const MainPage = () => {
  return (
    <div>
      <MainPageTitle />
      <CryptoPrice />
    </div>
  );
};

export default MainPage;