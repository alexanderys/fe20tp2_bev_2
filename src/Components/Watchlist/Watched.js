import React, { useContext, useEffect, useState } from "react";
import MovieItem from "../Search/MovieItem";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { ResultsGrid } from "../StyledComponents";

export const Watched = () => {
  const IMAGE_URL = "https://image.tmdb.org/t/p/w1280";
  const { currentUser } = useAuth();
  const [watchedMovies, setWatchedMovies] = useState([]);

  useEffect(() => {
    db.collection("users")
      .doc(currentUser.uid)
      .collection("haveWatched")
      .get()
      //this is async, so it returns a promise
      .then((snapshot) => {
        let documents = [];
        snapshot.docs.forEach((doc) => {
          documents.push(doc.data().movieTitle);
        });
        setWatchedMovies(documents);
      });
  }, []);

  return (
    <div>
      <div className="header">
        <h1>Watched Movies</h1>
        <h3>CurrentUser uid: {currentUser.uid}</h3>
        <h2>Watched Movies: {watchedMovies}</h2>

        <h3 className="count-pill">
          {watchedMovies.length}{" "}
          {watchedMovies.length === 1 ? "movie" : "movies"}
        </h3>
      </div>

      {watchedMovies.length > 0 ? (
        <ResultsGrid>
          {watchedMovies.map(
            ({
              id,
              title,
              overview,
              vote_average,
              poster_path,
              release_date,
            }) => (
              <MovieItem
                title={title}
                key={id}
                overview={overview}
                voteAverage={vote_average}
                releaseDate={release_date}
                posterPath={poster_path}
                imgComboPath={IMAGE_URL + poster_path}
              />
            )
          )}
        </ResultsGrid>
      ) : (
        <h2>No movies in your list! Add some!</h2>
      )}
    </div>
  );
};
