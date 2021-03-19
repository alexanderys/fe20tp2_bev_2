import React, { useState, useEffect } from 'react';
import { withAuthorization } from '../Session';
import axios from 'axios';

const IMAGE_URL = "https://image.tmdb.org/t/p/original";

function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);

    const onInputChange = (e) => {
        e.preventDefault();

        setSearchTerm(e.target.value);

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=0b990be39bf553eaa0eaaba70e328081&language=en-US&page=1&include_adult=false&query=${e.target.value}`)
            .then((res) => res.json())
            .then((data) => {
                if (!data.errors) {
                    setMovies(data.results);
                } else {
                    setMovies([]);
                }
            });
    }

    return (
        <div>
            <label htmlFor="search">Search movies
                <input
                    id='search'
                    name='search'
                    type="text"
                    value={searchTerm}
                    onChange={onInputChange}
                />
            </label>

            {movies.length > 0 && (
                <ul>
                    {movies.map((movie) => (
                        <li key={movie.id}>
                            <img style={{ width: 70 }}
                                src={IMAGE_URL + movie.poster_path}
                                alt={movie.title}
                            />
                            <h3>{movie.title}</h3>
                            <p>{movie.release_date}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Search);