import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { StatsSection } from "./StyledComponents";
import BarChart from "./Stats/BarChart";
import LineChart from "./Stats/LineChart";
import PieChart from "./Stats/PieChart";
import { Doughnut, defaults } from "react-chartjs-2";

defaults.global.tooltips.enabled = true;
defaults.global.legend.position = "bottom";

function Stats() {
  const { currentUser } = useAuth();
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [watchedMoviesVoteAvg, setWatchedMoviesVoteAvg] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    db.collection("users")
      .doc(currentUser.uid)
      .collection("haveWatched")
      .get()
      .then((snapshot) => {
        let movies = [];
        let voteAverage = [];
        snapshot.docs.forEach((doc) => {
          movies.push(doc.data());
          voteAverage.push(doc.data().voteAverage);
        });
        setWatchedMovies(movies);
        setWatchedMoviesVoteAvg(voteAverage);
        setIsLoading(false);
      });
  }, []);

  // Row 30 to 35 needs to run AFTER data have been fetched from fb.
  // Solve this!!!!!!!!

  const sumVoteAverage = watchedMoviesVoteAvg.reduce(
    (result, number) => result + number,
    0
  );
  const avg = Math.round((sumVoteAverage / watchedMovies.length) * 10) / 10;

  const [voteAverageData, setVoteAverageData] = useState({});

  const chart = () => {
    let avgNumber = [avg];
    let avgBack = [10 - avg];

    setVoteAverageData({
      labels: avgNumber,
      datasets: [
        {
          data: [avgNumber, avgBack],
          backgroundColor: ["rgba(255, 139, 132, 0.5)"],
          borderWidth: 4,
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
    <StatsSection>
      <h1>Stats</h1>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <Doughnut
              data={voteAverageData}
              options={{
                responsive: true,
                title: { text: "Average Rating", display: true, fontSize: 20 },
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
                    fontSize: 22,
                    boxWidth: 0,
                  },
                },
              }}
            />
            <BarChart />
            <LineChart />
            <PieChart />
          </>
        )}
      </div>

      {avg ? (
        <div>
          <span>
            Number of movies watched:
            <strong>{watchedMovies.length}</strong>
          </span>
          <br />
          <span>
            Average rating: <strong>{avg}</strong>
          </span>
        </div>
      ) : (
        <p>use the app, boy/girl/non-binary!</p>
      )}
      <br />
    </StatsSection>
  );
}

export default Stats;
