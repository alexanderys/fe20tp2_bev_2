import React from 'react';

const IMAGE_URL = "https://image.tmdb.org/t/p/original";

const ActorItem = ({ movie }) => {
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
    )
}

export default ActorItem;
