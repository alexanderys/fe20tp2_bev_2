import React, { useContext } from "react";
import { globalContext } from "../../context/GlobalState";
import MovieItem from "../Search/MovieItem";
import styled from "styled-components";

const MovieListGrid = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border: 2px solid blue;
`;

export const Watchlist = () => {
  const IMAGE_URL = "https://image.tmdb.org/t/p/w1280";
  const { watchlist } = useContext(globalContext);

  return (
    <div>
      <div className="header">
        <h1>My Watchlist</h1>
        <h3 className="count-pill">
          {watchlist.length} {watchlist.length === 1 ? "Movie" : "Movies"}
        </h3>
      </div>

      {watchlist.length > 0 ? (
        <MovieListGrid>
          {watchlist.map(
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
                posterPath={poster_path}
                imgComboPath={IMAGE_URL + poster_path}
                releaseDate={release_date}
                type="watchlist"
              />
            )
          )}
        </MovieListGrid>
      ) : (
        <h2>No movies in your list! Add some!</h2>
      )}
    </div>
  );
};
