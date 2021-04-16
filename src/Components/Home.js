import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieItem from './Search/MovieItem';
import { PrimarySection, ResultsGrid } from './StyledComponents';
import * as URL from '../constants/urlParts';

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
      <PrimarySection>
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
            }) => (
              <MovieItem
                key={id}
                title={title}
                id={id}
                overview={overview}
                voteAverage={vote_average}
                releaseDate={release_date}
                posterPath={poster_path}
              />
            )
          )}
        </ResultsGrid>
      </PrimarySection>
    </>
  );
};

export default Home;
