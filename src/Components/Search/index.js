import React, { useState, useEffect } from "react";
import { withAuthorization } from "../Session";
import axios from "axios";

const IMAGE_URL = "https://image.tmdb.org/t/p/original";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  // Error State, not sure if needed...
  const [error, setError] = useState("");

  // Pagination State
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setmoviesPerPage] = useState(10);

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

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // returns posts for active sites
  // i.e. pg 3 shows movie 30-39
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

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
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
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
              return (
                <li key={movie.id}>
                  <img
                    style={{ width: 70 }}
                    src={IMAGE_URL + movie.poster_path}
                    alt={movie.title}
                  />
                  <h3>{movie.title}</h3>
                  <p>
                    {movie.release_date
                      ? movie.release_date.substring(0, 4)
                      : ""}
                  </p>
                </li>
              );
            } else if (movie.media_type === "person") {
              console.log(movie);
              return (
                <li key={movie.id}>
                  <img
                    style={{ width: 70 }}
                    src={IMAGE_URL + movie.profile_path}
                    alt={movie.name}
                  />
                  <h3>{movie.name}</h3>
                  <p>
                    Actor/Actress
                    {movie.known_for[0] && !!movie.known_for[0].title ? (
                      <span>, {movie.known_for[0].title} </span>
                    ) : (
                      ""
                    )}
                    {movie.known_for[0] && !!movie.known_for[0].release_date ? (
                      <span>
                        {" "}
                        ({movie.known_for[0].release_date.substring(0, 4)}){" "}
                      </span>
                    ) : (
                      ""
                    )}
                  </p>
                </li>
              );
            } else if (movie.media_type === "tv") {
              return (
                <li key={movie.id}>
                  <img
                    style={{ width: 70 }}
                    src={IMAGE_URL + movie.poster_path}
                    alt={movie.title}
                  />
                  <h3>{movie.name}</h3>
                  <p>
                    {movie.first_air_date
                      ? movie.first_air_date.substring(0, 4)
                      : ""}
                  </p>
                </li>
              );
            }
          })}
        </ul>
      )}
    </div>
  );
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Search);
