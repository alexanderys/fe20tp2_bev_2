import React from "react";
import { Pie, defaults } from "react-chartjs-2";

defaults.global.tooltips.enabled = true;
defaults.global.legend.position = "bottom";

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
            borderWidth: 1,
          },
        ],
      }}
      //   height={300}
      //   width={300}
      options={{
        responsive: true,
        // maintainAspectRatio: false,
        title: { text: "Pie title", display: true },
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
          labels: {
            fontSize: 10,
            fontColor: "pink",
            padding: 3,
          },
        },
      }}
    />
  );
};

export default PieChart;
