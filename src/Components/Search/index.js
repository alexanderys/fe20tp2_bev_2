import React, { useState, useEffect } from 'react';
import { withAuthorization } from '../Session';
import axios from 'axios';

function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [submitted, setSubmitted] = useState(null);

    const onInputChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const onSubmit = () => {
        console.log(searchTerm);
        setSubmitted(!submitted);
    }
    setTimeout(
        useEffect(() => {
            axios.get(`https://api.themoviedb.org/3/search/multi?api_key=0b990be39bf553eaa0eaaba70e328081&language=en-EN&page=1&include_adult=false&query=${searchTerm}`)
                .then((res) => {
                    setMovies(res.data.results);

                    //In case of trouble, the tutorial wrote a map here!!
                    // setMovies(res.data.results.map((movie) => movie));
                })
                .then(() => {
                    console.log(movies)
                });
        }, [submitted]), 2000)



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
            <button onClick={onSubmit}>Submit</button>
        </div>
    )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Search);