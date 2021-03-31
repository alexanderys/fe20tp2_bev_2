import { useState, useEffect } from "react";
import axios from "axios";
import MovieItem from "./Search/MovieItem";
import styled from "styled-components";
import * as CONSTS from '../constants/consts';

const MovieListGrid = styled.main`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border: 3px solid green;
`;

const MovieList = () => {

  //INFO = These consts are now declared in the file consts.js instead

  // const BASE_URL = "https://api.themoviedb.org/3";
  // const NOW_PLAYING = "/movie/now_playing?api_key=";
  // const API_KEY = "076af6ad004d95e72faff607aff3810e";
  // const SETTINGS = "&language=en-US&page=1";
  // const IMAGE_URL = "https://image.tmdb.org/t/p/w1280";

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(CONSTS.BASE_URL + CONSTS.NOW_PLAYING + CONSTS.API_KEY + CONSTS.SETTINGS).then((res) => {
      setMovies(res.data.results);
      //In case of trouble, the tutorial wrote a map here!!
      // setMovies(res.data.results.map((movie) => movie));
    });
  }, []);

  return (
    <>
      <h1>Now Playing</h1>
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
              key={id}
              title={title}
              id={id}
              overview={overview}
              voteAverage={vote_average}
              releaseDate={release_date}
              posterPath={poster_path}
              imgComboPath={CONSTS.IMAGE_URL + poster_path}
            />
          )
        )}
      </MovieListGrid>
    </>
  );
};

export default MovieList;
