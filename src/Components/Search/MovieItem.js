import React from 'react';

const IMAGE_URL = "https://image.tmdb.org/t/p/original";

const MovieItem = ({ movie }) => {
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
    )
}

export default MovieItem;
