// UPPSAMLINGSSIDA DÄR VARJE INDIVIDUELL COMP RENDERAS UT

import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { StatsSection, CircleStats, SquareStats, StatsContainer } from "../StyledComponents";
import AvgRatingChart from "./AvgRatingChart";
import BarChart from "./BarChart";
// import LineChart from "./LineChart";
import PieChart from "./PieChart";

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
        console.log(
          "You have seen " + lastWeek.length + " nr of movies in the last 5 min"
        );
      });
  }, []);

  return (
    <StatsSection>
      <h1>Stats</h1>
      <section>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div>
              {/*             <div style={{display: "flex"}}>
              <div style={{width: "50%"}}> */}
              <AvgRatingChart />
              {/*               </div>
            <br />
              <div style={{width: "50%"}}> */}
              <PieChart />
              {/*               </div>
            </div> */}
              <br />
            </div>
            <BarChart />
            <br />

            {/* <div className="stats-container"> */}
            <StatsContainer>
              <h3>
                Movies seen this week
            </h3>
              <SquareStats> <p> {lastWeek.length} </p> </SquareStats>
              <h3>
                Total movies watched
            </h3>
              <CircleStats> <p>{watchedMovies.length}</p> </CircleStats>
            </StatsContainer>

            <StatsContainer>
              <div>
                <SquareStats> {lastWeek.length} </SquareStats>
                <span>
                  Movies seen this week
            </span>
              </div>
              <div>
                <CircleStats> {watchedMovies.length} </CircleStats>
                <span>
                  Total movies watched
            </span>
              </div>
            </StatsContainer>

          </>
        )}


      </section>
      <br />
      <br />
      <br />
    </StatsSection>
  );
}

export default Stats;
