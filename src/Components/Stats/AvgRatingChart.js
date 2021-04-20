import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { Doughnut } from "react-chartjs-2";
import { withTheme } from "styled-components";

const AvgRatingChart = () => {
  const { currentUser } = useAuth();
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [watchedMoviesVoteAvg, setWatchedMoviesVoteAvg] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [voteAverageData, setVoteAverageData] = useState({});

  useEffect(() => {
    db.collection("users")
      .doc(currentUser.uid)
      .collection("haveWatched")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          watchedMovies.push(doc.data());
          watchedMoviesVoteAvg.push(doc.data().voteAverage);
        });
        setIsLoading(false);
      });
  }, []);

  const sumVoteAverage = watchedMoviesVoteAvg.reduce(
    (result, number) => result + number,
    0
  );
  const avg = Math.round((sumVoteAverage / watchedMovies.length) * 10) / 10;

  const chart = () => {
    let avgNumber = [avg];
    let avgBack = [10 - avg];

    setVoteAverageData({
      labels: avgNumber,
      datasets: [
        {
          data: [avgNumber, avgBack],
          backgroundColor: ["rgba(255, 186, 181, 0.9)", "rgb(84, 84, 84)"],
          borderWidth: 0,
        },
      ],
    });
  };

  useEffect(() => {
    if (!isLoading) {
      chart();
    }
  }, [isLoading]);

  return (
    <Doughnut
      data={voteAverageData}
      options={{
        responsive: true,
        title: {
          text: "Average Rating",
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
            fontSize: 22,
            boxWidth: 0,
            fontColor: "white",
          },
        },
        tooltips: {
          enabled: false,
        },
      }}
    />
  );
};

export default AvgRatingChart;
