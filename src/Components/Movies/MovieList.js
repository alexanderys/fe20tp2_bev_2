import { useState, useEffect } from "react";
import axios from "axios";

/**
 * 1. API KEY:  076af6ad004d95e72faff607aff3810e (Guns)
 * 2. Import useFetch();
 * 3. What to fetch from TMDB?
 **/


/*   
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=1b0fe85392a0de289e401e2f384cf20b&query="';
 */
/* movies.forEach((movie) => {
  const { title, poster_path, vote_average, overview } = movie;
});
 */

const MovieList = () => {
  const API_URL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1b0fe85392a0de289e401e2f384cf20b&page=1";
    const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(API_URL).then((res) => {
      setMovies(res.data.results);

      //In case of trouble, the tutorial wrote a map here!!
      // setMovies(res.data.results.map((movie) => movie));
    });
  }, []);

  return (
    <>
      <h1>MovieList</h1>
      {
        movies.map((movie) => (<>
          <img style={{width: 300}}
          src={IMG_PATH + movie.poster_path}
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
    </>
  );
};

export default MovieList;
