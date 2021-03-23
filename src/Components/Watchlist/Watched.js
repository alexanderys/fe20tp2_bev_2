import React, { useContext } from "react";
import { globalContext } from "../../context/GlobalState";
import MovieItem from "../MovieItem";
import styled from "styled-components";

const MovieListGrid = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border: 2px solid yellow;
`;

export const Watched = () => {
  const IMAGE_URL = "https://image.tmdb.org/t/p/w1280";
  const { watched } = useContext(globalContext);

  return (
    <div>
      <div className="header">
        <h1>Watched Movies</h1>

        <h3 className="count-pill">
          {watched.length} {watched.length === 1 ? "Movie" : "Movies"}
        </h3>
      </div>

      {watched.length > 0 ? (
        <MovieListGrid>
          {watched.map(
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
                type="watched"
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
