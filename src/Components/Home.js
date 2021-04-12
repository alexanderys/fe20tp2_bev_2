import { useState, useEffect } from "react";
import axios from "axios";
import MovieItem from "./Search/MovieItem";
import { ResultsGrid } from "./StyledComponents";
import * as URL from "../constants/urlParts";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(URL.BASE_URL + URL.NOW_PLAYING + URL.API_KEY + URL.SETTINGS)
      .then((res) => {
        setMovies(res.data.results);
      });
  }, []);

  return (
    <>
      <h1>Now Playing</h1>
      <ResultsGrid>
        {movies.map(
          ({
            id,
            title,
            overview,
            vote_average,
            poster_path,
            release_date,
            genre_ids,
          }) => (
            <MovieItem
              key={id}
              title={title}
              id={id}
              overview={overview}
              voteAverage={vote_average}
              releaseDate={release_date}
              posterPath={poster_path}
              imgComboPath={URL.IMAGE_URL + poster_path}
              genreIds={genre_ids}
            />
          )
        )}
      </ResultsGrid>
    </>
  );
};

export default Home;
