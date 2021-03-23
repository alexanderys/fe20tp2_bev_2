import React, { useContext } from "react";
import { globalContext } from "../../context/GlobalState";

export const MovieControls = ({ type, movie }) => {
  const {
    removeMovieFromWatchlist,
    addMovieToWatched,
    moveToWatchlist,
    removeFromWatched,
  } = useContext(globalContext);

  return (
    <div>
      {type === "watchlist" && (
        <>
          <button onClick={() => addMovieToWatched(movie)}>
            Add to watched
          </button>

          <button onClick={() => removeMovieFromWatchlist(movie.id)}>
            Remove from Watchlist
          </button>
        </>
      )}

      {type === "watched" && (
        <>
          <button onClick={() => moveToWatchlist(movie)}>
            Move to Watchlist
          </button>

          <button onClick={() => removeFromWatched(movie.id)}>
            Remove from watched
          </button>
        </>
      )}
    </div>
  );
};
