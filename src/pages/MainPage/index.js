import React from "react";

const MainPage = () => {
  console.log("MainPage is rendered!");

  return (
    <div>
      <div className="container">
        <div className="title_block">
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
        </div>
      </div>
    </div>
  );
};

export default MainPage;
