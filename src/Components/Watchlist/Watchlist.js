import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import MovieItem from "../Search/MovieItem";
import TvItem from "../Search/TvItem";
import { ResultsGrid } from "../StyledComponents";

export const Watchlist = () => {
  const { currentUser } = useAuth();
  const [contentInWatchlist, setContentInWatchlist] = useState([]);

  useEffect(() => {
    db.collection("users")
      .doc(currentUser.uid)
      .collection("watchlist")
      .get()
      //this is async, so it returns a promise
      .then((snapshot) => {
        let documents = [];
        snapshot.docs.forEach((doc) => {
          documents.push(doc.data());
        });
        setContentInWatchlist(documents);
      });
  }, []);

  return (
    <>
      <div>
        <h1>My Watchlist</h1>
        <strong>User email: </strong> {currentUser.email}
        <br />
        <strong>UID: </strong>
        {currentUser.uid}
        <hr /> <br />
        <h3>
          {"You have " + contentInWatchlist.length + " "}
          {contentInWatchlist.length === 1 ? "title" : "titles"}
          {" in your watchlist"}
        </h3>
      </div>

      <br />

      {contentInWatchlist.length > 0 ? (
        <>
          <hr />
          <ResultsGrid>
            {contentInWatchlist.map(
              ({
                id,
                movieTitle,
                tvTitle,
                releaseDate,
                firstAirDate,
                posterPath,
                voteAverage,
              }) => {
                if (movieTitle) {
                  return (
                    <MovieItem
                      id={id}
                      title={movieTitle}
                      releaseDate={releaseDate}
                      posterPath={posterPath}
                      voteAverage={voteAverage}
                    />
                  );
                } else if (tvTitle) {
                  return (
                    <TvItem
                      id={id}
                      name={tvTitle}
                      firstAirDate={firstAirDate}
                      posterPath={posterPath}
                      voteAverage={voteAverage}
                    />
                  );
                }
              }
            )}
          </ResultsGrid>
        </>
      ) : (
        <h2>No content in your watchlist! Add some!</h2>
      )}
    </>
  );
};

export default Watchlist;
