import React from "react";
import { Pie } from "react-chartjs-2";

export const PieChart = () => {
  return (
    <Pie
      data={{
        labels: ["Comedy", "Action", "Sci-fi", "Family", "Horror", "Drama"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      }}
      options={{
        responsive: true,
        title: {
          text: "Your genres",
          display: true,
          fontSize: 20,
          fontColor: "white",
        },
        scales: {
          yAxes: [
            {
              ticks: { display: false },
              gridLines: { display: false },
            },
          ],
          xAxes: [
            {
              gridLines: { display: false },
              ticks: { display: false },
            },
          ],
        },
        legend: {
          position: "bottom",
          labels: {
            fontSize: 14,
            weight: "bold",
            fontColor: "white",
            padding: 5,
            boxWidth: 40,
          },
        },
      }}
    />
  );
};

export default PieChart;
