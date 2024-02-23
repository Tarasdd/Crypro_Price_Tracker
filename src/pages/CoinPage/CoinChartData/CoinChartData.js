import React, { useEffect, useState, useRef } from "react";
import classes from "./CoinChartData.module.scss";
import axios from "axios";
import Chart from "chart.js/auto";
import cryptoStore from "../../../store/cryproStore";
import { observer } from "mobx-react-lite";

const CoinChartData = observer(({ coin }) => {
  const [chartData, setChartData] = useState();
  const [days, setDays] = useState(1);
  const chartRef = useRef(null);
  let chartInstance = null;

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
    if (chartData && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (chartInstance) {
        chartInstance.destroy();
      }
      chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: chartData.map((entry) => {
            const date = new Date(entry[0]);
            const time =
              date.getHours() > 12
                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                : `${date.getHours()}:${date.getMinutes()} AM`;
            return days === 1 ? time : date.toLocaleDateString();
          }),
          datasets: [
            {
              label: `Price (Past ${days} Days) in USD`,
              data: chartData.map((entry) => entry[1]),
              borderColor: "#EEBC1D",
            },
          ],
        },
        options: {
          elements: {
            point: {
              radius: 1,
            },
          },
        },
      });
  
      const handleResize = () => {
        if (chartInstance) {
          chartInstance.resize();
        }
      };
  
      window.addEventListener("resize", handleResize);
  
      return () => {
        window.removeEventListener("resize", handleResize);
        if (chartInstance) {
          chartInstance.destroy();
        }
      };
    }
  }, [chartData, chartRef, days]);

  return (
    <>
      <canvas ref={chartRef} />
      {/* Buttons */}
      <div className={classes.button}>
        {cryptoStore.chartDays.map((day) => (
          <button key={day.value} onClick={() => setDays(day.value)}>
            {day.label}
          </button>
        ))}
      </div>
    </>
  );
});

export default CoinChartData;
