import { useState, useEffect } from "react";
import axios from "axios";

/**
 * 1. API KEY:  076af6ad004d95e72faff607aff3810e (Guns)
 * 2. Import useFetch();
 * 3. What to fetch from TMDB?
 **/

export const API_URL = "https://api.themoviedb.org/3";
export const NOW_PLAYING = "/movie/now_playing?api_key=";
export const MOST_POPULAR = "/movie/popular?api_key=";
export const TOP_RATED = "/movie/top_rated?api_key=";
export const API_KEY = "076af6ad004d95e72faff607aff3810e";
export const SETTINGS = "&language=en-US&page=1";
export const IMAGE_URL = "https://image.tmdb.org/t/p/original";
export const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=1b0fe85392a0de289e401e2f384cf20b&query="';

/*   
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=1b0fe85392a0de289e401e2f384cf20b&query="';
 */
/* movies.forEach((movie) => {
  const { title, poster_path, vote_average, overview } = movie;
});
 */
// const NOW_PLEJJING = `/movie/now_playing?api_key=${URL_KEY}&language=en-US&page=1`

/* https://api.themoviedb.org/3/movie/now_playing?api_key=<<api_key>>&language=en-US&page=1 */

const MovieList = () => {
  const BASE_URL = "https://api.themoviedb.org/3"
  const NOW_PLAYING = "/movie/now_playing?api_key="
  const API_KEY = "076af6ad004d95e72faff607aff3810e"
  const SETTINGS = "&language=en-US&page=1"
  const IMAGE_URL = "https://image.tmdb.org/t/p/w1280";

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(BASE_URL + NOW_PLAYING + API_KEY + SETTINGS).then((res) => {
      setMovies(res.data.results);

      //In case of trouble, the tutorial wrote a map here!!
      // setMovies(res.data.results.map((movie) => movie));
    });
  }, []);

  return (
    <>
      <h1>MovieList</h1>
      <h2>Now Playing</h2>
      {
        movies.map((movie) => (<>
          <img style={{ width: 300 }}
            src={IMAGE_URL + movie.poster_path}
            alt={movie.title}
          />
          <div>
            <h3>{movie.title}</h3>
            <span>{movie.vote_average}</span>
          </div>
          <div>
            <h3>Overview</h3>
            {movie.overview}
          </div>

        </>
        ))
      }
      <h2></h2>
      {

      }
    </>
  );
};

export default MovieList;
