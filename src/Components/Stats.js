import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import styled from "styled-components";

export const StatsPage = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 2rem;
    text-align: center;
    margin: 100px 0;
  }

  span {
    font-size: 1.2rem;
  }
`;

function Stats() {
  const { currentUser } = useAuth();
  const [watchedMoviesTitles, setWatchedMoviesTitles] = useState([]);
  const [watchedMoviesVoteAvg, setWatchedMoviesVoteAvg] = useState([]);

  useEffect(() => {
    db.collection("users")
      .doc(currentUser.uid)
      .collection("haveWatched")
      .get()
      .then((snapshot) => {
        let titles = [];
        let voteAverage = [];
        snapshot.docs.forEach((doc) => {
          titles.push(doc.data().movieTitle);
          voteAverage.push(doc.data().voteAverage);
        });
        setWatchedMoviesTitles(titles);
        setWatchedMoviesVoteAvg(voteAverage);
      });
  }, []);

  const sumVoteAverage = watchedMoviesVoteAvg.reduce(
    (result, number) => result + number,
    0
  );
  const avg =
    Math.round((sumVoteAverage / watchedMoviesTitles.length) * 10) / 10;

  return (
    <StatsPage>
      <h1>Stats</h1>
      <span>
        Number of movies watched: <strong>{watchedMoviesTitles.length}</strong>
      </span>
      <br />
      <span>
        Average rating: <strong>{avg}</strong>
      </span>
    </StatsPage>
  );
}

export default Stats;
