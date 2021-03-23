import React, { useState, useEffect } from "react";
import { withAuthorization } from "../Session";
import axios from "axios";

import Pagination from './pagination';
import MovieItem from './MovieItem';
import ActorItem from './ActorItem';
import TvItem from './TvItem';


const IMAGE_URL = "https://image.tmdb.org/t/p/original";


function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  // Error State, not sure if needed...
  const [error, setError] = useState("");

  // Pagination State
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(10);

  // Video uses useEffect for fetching

  /*
      useEffect(() => {
      const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);
    
    */

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

  /*
    return (
    <div className='container mt-5'>
      <h1 className='text-primary mb-3'>My Blog</h1>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  
  */

  return (
    <div>
      <Pagination
        moviesPerPage={moviesPerPage}
        totalMovies={movies.length}
        paginate={paginate}
      />

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
        <ul>
          {movies.map((movie) => {
            if (movie.media_type === "movie") {
              return <MovieItem movie={movie} />;
            } else if (movie.media_type === "person") {
              return <ActorItem movie={movie} />;
            } else if (movie.media_type === "tv") {
              return <TvItem movie={movie} />;
            }
          })}
        </ul>
      )}
    </div>
  );
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Search);
