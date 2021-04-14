import React, { useState } from "react";
import Pagination from "./pagination";
import MovieItem from "./MovieItem";
import ActorItem from "./ActorItem";
import TvItem from "./TvItem";
import { ResultsGrid } from "../StyledComponents";
import { SearchSection, SearchLabel, SearchInput } from "../StyledComponents";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  // Pagination State
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(9);

  const onInputChange = (e) => {
    e.preventDefault();
    setCurrentPage(1);

    setSearchTerm(e.target.value);
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1&include_adult=false&query=${e.target.value}`
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
    <SearchSection>
      <SearchLabel htmlFor="search">
        <SearchInput
          id="search"
          name="search"
          type="text"
          placeholder="Search for movie, show or actor"
          value={searchTerm}
          onChange={onInputChange}
        />
      </SearchLabel>

      {currentMovies.length > 0 && (
        <>
          <h2>Showing results for "{searchTerm}"</h2>
          <Pagination
            moviesPerPage={moviesPerPage}
            totalMovies={movies.length}
            paginate={paginate}
          />
          <ResultsGrid>
            {currentMovies.map(
              ({
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
                genre_ids,
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
                      genreIds={genre_ids}
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
                      voteAverage={vote_average}
                      genreIds={genre_ids}
                    />
                  );
                }
              }
            )}
          </ResultsGrid>
        </>
      )}
    </SearchSection>
  );
}

export default Search;
