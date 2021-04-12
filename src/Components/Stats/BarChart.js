import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = () => {
  return (
    <Bar
      data={{
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
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
          {
            label: "Quantity",
            data: [3, 14, 6, 17, 9, 11],
            backgroundColor: "beige",
            borderColor: "red",
          },
        ],
      }}
      options={{
        responsive: true,
        title: { text: "Bar title", display: true },
        scales: {
          yAxes: [
            {
              ticks: {
                autoSkip: true,
                maxTicksLimit: 10,
                beginAtZero: true,
              },
            },
          ],
          xAxes: [
            {
              gridLines: { display: false },
            },
          ],
        },
        legend: {
          labels: {
            fontSize: 10,
            fontColor: "pink",
          },
        },
      }}
    />
  );
};

export default BarChart;
