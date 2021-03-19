import React, { useState, useContext } from "react";
// import Moment from "react-moment";
import { globalContext } from "../../context/GlobalState";
import { MovieControls } from "./MovieControls";

export const ResultCard = ({ movie, type }) => {
  const {
    addMovieToWatchlist,
    addMovieToWatched,
    watchlist,
    watched,
  } = useContext(globalContext);

  let storedMovie = watchlist.find((o) => o.id === movie.id);
  let storedMovieWatched = watched.find((o) => o.id === movie.id);

  const watchlistDisabled = storedMovie
    ? true
    : storedMovieWatched
    ? true
    : false;

  const watchedDisabled = storedMovieWatched ? true : false;

  // const [haveWatched, setHaveWatched] = useState(true);
  // function toggle() {
  //   setHaveWatched(!haveWatched);
  // }

  return (
    <div className="result-card">
      <div className="poster-wrapper">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={`${movie.title} Poster`}
          />
        ) : (
          <div className="filler-poster" />
        )}
      </div>

      <div className="info">
        <div className="header">
          <h3 className="title">{movie.title}</h3>
          <h4 className="release-date">
            {movie.release_date}
            {/* <Moment format="YYYY">{movie.release_date}</Moment> */}
          </h4>
        </div>
        <MovieControls type={type} movie={movie} />
        <div className="controls">
          {/* <button onClick={toggle}>
            {haveWatched ? (
              <p>Add to wwwatched</p>
            ) : (
              <p>Remove from wwwatched</p>
            )}
          </button> */}

          <button
            className="btn"
            disabled={watchlistDisabled}
            onClick={() => addMovieToWatchlist(movie)}
          >
            Add to Watchlist
          </button>

          <button
            className="btn"
            disabled={watchedDisabled}
            onClick={() => addMovieToWatched(movie)}
          >
            Add to Watched
          </button>
        </div>
      </div>
    </div>
  );
};
