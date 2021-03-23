import React, { useState, useEffect, useContext } from "react";
import { ResultCard } from "./Watchlist/ResultCard";
import { globalContext } from "../context/GlobalState";
import axios from "axios";
import { MovieControls } from "./Watchlist/MovieControls";
import MovieItem from "./MovieItem";
import styled from "styled-components";

const MovieListGrid = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border: 2px solid purple;
`;

const IMAGE_URL = "https://image.tmdb.org/t/p/original";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  const onInputChange = (e) => {
    e.preventDefault();

    setSearchTerm(e.target.value);

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=0b990be39bf553eaa0eaaba70e328081&language=en-US&page=1&include_adult=false&query=${e.target.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setMovies(data.results);
        } else {
          setMovies([]);
        }
      });
  };

  return (
    <div>
      <h1>Search</h1>
      <label htmlFor="search">
        Search movies
        <input
          id="search"
          name="search"
          type="text"
          value={searchTerm}
          onChange={onInputChange}
        />
      </label>

      {movies.length > 0 && (
        <>
          {" "}
          <h2>Showing results for "{searchTerm}"</h2>
          <MovieListGrid>
            {movies.map(
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
          </MovieListGrid>
        </>
      )}
    </div>
  );
}

export default Search;
