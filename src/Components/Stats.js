import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";

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
  const avg = sumVoteAverage / watchedMoviesTitles.length;

  return (
    <div>
      <h1>Stats</h1>
      <strong>Number of movies watched: </strong>
      <span>{watchedMoviesTitles.length}</span>
      <br />
      <strong>Average rating: </strong>
      <span>{avg}</span>
    </div>
  );
}

export default Stats;
