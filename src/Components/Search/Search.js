import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./pagination";
import MovieItem from "./MovieItem";
import ActorItem from "./ActorItem";
import TvItem from "./TvItem";
import { ResultsGrid } from "../StyledComponents";

const IMAGE_URL = "https://image.tmdb.org/t/p/original";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  // Pagination State
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(10);

  const onInputChange = (e) => {
    e.preventDefault();

    setSearchTerm(e.target.value);
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=0b990be39bf553eaa0eaaba70e328081&language=en-US&page=1&include_adult=false&query=${e.target.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setMovies(data.results);
        } else {
          setMovies([]);
        }
      });
    // loading done
    setLoading(false);
  };

  // Get current movies
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;

  // returns posts for active sites
  // i.e. pg 3 shows movie 30-39
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>Search</h1>

      <Pagination
        moviesPerPage={moviesPerPage}
        totalMovies={movies.length}
        paginate={paginate}
      />

      <label htmlFor="search">
        Search:
        <input
          id="search"
          name="search"
          type="text"
          value={searchTerm}
          onChange={onInputChange}
        />
      </label>

      {currentMovies.length > 0 && (
        // Göra om ul till en komponent som innehåller pagination
        <>
          <h2>Showing results for "{searchTerm}"</h2>
          <ResultsGrid>
            {currentMovies.map(
              ({
                movie,
                id,
                title,
                overview,
                vote_average,
                poster_path,
                release_date,
                name,
                profile_path,
                media_type,
                first_air_date,
                known_for,
              }) => {
                if (media_type === "movie") {
                  return (
                    <MovieItem
                      title={title}
                      key={id}
                      id={id}
                      overview={overview}
                      voteAverage={vote_average}
                      releaseDate={release_date}
                      posterPath={poster_path}
                      imgComboPath={IMAGE_URL + poster_path}
                    />
                  );
                } else if (media_type === "person") {
                  return (
                    <ActorItem
                      name={name}
                      profilePath={profile_path}
                      key={id}
                      id={id}
                      title={title}
                      knownFor={known_for}
                      releaseDate={release_date}
                    />
                  );
                } else if (media_type === "tv") {
                  return (
                    <TvItem
                      name={name}
                      key={id}
                      id={id}
                      title={title}
                      posterPath={poster_path}
                      firstAirDate={first_air_date}
                      overview={overview}
                    />
                  );
                }
              }
            )}
          </ResultsGrid>
        </>
      )}
    </div>
  );
}

export default Search;

{
  /* <MovieListGrid>
            {currentMovies.map(
              ({ id, title, overview, vote_average, poster_path, release_date,
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
          </MovieListGrid> */
}
