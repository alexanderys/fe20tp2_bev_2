// UPPSAMLINGSSIDA DÄR VARJE INDIVIDUELL COMP RENDERAS UT

import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import {
  StatsSection,
  CircleStats,
  NumberStats,
  StatsContainer,
  CircleContainer,
  SquareContainer,
} from "../StyledComponents";
import AvgRatingChart from "./AvgRatingChart";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

function Stats() {
  const { currentUser } = useAuth();
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [watchedMoviesVoteAvg, setWatchedMoviesVoteAvg] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastWeek, setLastWeek] = useState([]);

  // 604800000 - 1 week in ms

  useEffect(() => {
    /* setLastWeek([]); */
    const limit = Date.now() - 900000;
    // Limit is  now 15 min
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
      });
  }, []);

  return (
    <>
      <StatsSection>
        <h1>Stats</h1>
        <section>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
            <StatsContainer>
                <SquareContainer>
                  <h3>Movies seen this week</h3>
                  <NumberStats>{lastWeek.length}</NumberStats>
                </SquareContainer>

                <CircleContainer>
                  <h3>Total movies watched</h3>
                  <CircleStats>
                    {" "}
                    <p>{watchedMovies.length}</p>{" "}
                  </CircleStats>
                </CircleContainer>
              </StatsContainer>
       
              <BarChart />
              <br />
                <PieChart  />
                 <br />
                <AvgRatingChart />
        
             

            </>
          )}
        </section>
        <br />
        <br />
        <br />
      </StatsSection>
      )
    </>
  );
}

export default Stats;
