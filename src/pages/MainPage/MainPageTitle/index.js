import React from "react";
import Input from "../../../components/Input";
import classes from "./MainPageTitle.module.scss"

const MainPageTitle = () => {
  console.log("MainPage is rendered!");

  return (
    <div className={classes.main_page}>
      <div className={classes.container}>
        <div className={classes.title_block}>
          <h1>Crypto Price Tracker</h1>
          <p>
            <span>By </span>
            <a
              href="https://github.com/Tarasdd"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tarasdd
            </a>
          </p>
          <Input />
        </div>
      </div>
    </div>
  );
};

export default MainPageTitle;