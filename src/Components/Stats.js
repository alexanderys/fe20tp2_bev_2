import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { SecondarySection } from "./StyledComponents";

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

  // Row 30 to 35 needs to run AFTER data have been fetched from fb.
  //Solve this!!!!!!!!

  const sumVoteAverage = watchedMoviesVoteAvg.reduce(
    (result, number) => result + number,
    0
  );
  const avg =
    Math.round((sumVoteAverage / watchedMoviesTitles.length) * 10) / 10;

  return (
    <SecondarySection>
      <h1>Stats</h1>
      <span>
        Number of movies watched: <strong>{watchedMoviesTitles.length}</strong>
      </span>
      <br />
      <span>
        Average rating: <strong>{avg}</strong>
      </span>
    </SecondarySection>
  );
}

export default Stats;
