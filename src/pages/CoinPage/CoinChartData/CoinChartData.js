import React, { useEffect, useState, useRef } from "react";
import classes from "./CoinChartData.module.scss";
import axios from "axios";
import Chart from "chart.js/auto";

const CoinChartData = ({ coin }) => {
  const [chartData, setChartData] = useState();
  const [days, setDays] = useState(7); // Default 7 days
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=${days}`
        );
        setChartData(data.prices);
      } catch (err) {
        console.error(`Error fetching chart data for coin ${coin.id}`, err);
      }
    };

    fetchChartData();
  }, [days]);

  useEffect(() => {
    // Create the chart after the data is fetched
    if (chartData && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: chartData.map((entry) => entry[0]), // Assuming each entry is an array with [timestamp, value]
          datasets: [
            {
              label: "Price",
              data: chartData.map((entry) => entry[1]), // Assuming each entry is an array with [timestamp, value]
              borderColor: "#EEBC1D",
            },
          ],
        },
      });
    }
  }, [chartData]);

  return (
    <div className={classes.container}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default CoinChartData;
