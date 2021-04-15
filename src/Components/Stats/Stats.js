// UPPSAMLINGSSIDA DÄR VARJE INDIVIDUELL COMP RENDERAS UT

import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext"
import { db } from "../../firebase";
import { StatsSection } from "../StyledComponents";
import AvgRatingChart from "./AvgRatingChart"
import BarChart from "./BarChart";
// import LineChart from "./LineChart";
import PieChart from "./PieChart";
import { Doughnut } from "react-chartjs-2"; // @TODO egen comp

// @ TODO i enskild komponent: Nytt timetamp, ta bort 1 vecka å se vad som ryms inom intervall

function Stats() {
  const { currentUser } = useAuth();
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [watchedMoviesVoteAvg, setWatchedMoviesVoteAvg] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastWeek, setLastWeek] = useState([]);

  // 604800000 - 1 week in ms

  useEffect(() => {
    setLastWeek([]);
    const limit = Date.now() - 300000;
    // Limit is  now 5 min
    console.log("limit: " + limit);
    db.collection("users")
      .doc(currentUser.uid)
      .collection("haveWatched")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.data().createdAt > limit) {
            lastWeek.push(doc.data());
          }
          watchedMovies.push(doc.data());
          watchedMoviesVoteAvg.push(doc.data().voteAverage);
        });
        setIsLoading(false);
        console.log('You have seen ' + lastWeek.length + " nr of movies in the last 5 min");
      });
  }, []);

  // dagens datum minus en vecka --> gränsen
  // om filmens timestamp är större än den, så behåller vi filmen

  const sumVoteAverage = watchedMoviesVoteAvg.reduce(
    (result, number) => result + number,
    0
  );
  const avg = Math.round((sumVoteAverage / watchedMovies.length) * 10) / 10;

  const [voteAverageData, setVoteAverageData] = useState({});

  /*   const nrOfMovies = lastWeek.map((movieTimestamp) => {
      
  
      if (movieTimestamp > limit) {
        console.log('inside if' + movieTimestamp)
      }
    }) */

  
  const chart = () => {
    let avgNumber = [avg];
    let avgBack = [10 - avg];

    setVoteAverageData({
      labels: avgNumber,
      datasets: [
        {
          data: [avgNumber, avgBack],
          backgroundColor: [
            "rgba(255, 159, 152, 0.9)",
            "rgba(222, 210, 210, 0.5)",
          ],
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
    <StatsSection>
      <h1>Stats</h1>
      <section>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <AvgRatingChart />
            <br />
            <BarChart />
            <br />
            <PieChart />
            <br />
          </>
        )}

        <div>
          <span>
            Number of movies watched: <strong> {watchedMovies.length}</strong>
          </span>
        </div>
      </section>
      <br />
      <br />
      <br />
    </StatsSection>
  );
}

export default Stats;
