import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";

/**
 * 1. API KEY:  076af6ad004d95e72faff607aff3810e (Guns)
 * 2. Import useFetch();
 * 3. What to fetch from TMDB?
 * 
 * 
 * 
 * 
 * 
**/


const urltest = "https://api.themoviedb.org/3/movie/top_rated?api_key=076af6ad004d95e72faff607aff3810e&language=en-US&page=1"

const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=1b0fe85392a0de289e401e2f384cf20b&query="';

const MovieList = () => {

  // byta ut data & argument i useFetch
  // data är den data vi vill lagra från API, (tänk destructuring)
  const { data: results, isPending, error } = useFetch("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1b0fe85392a0de289e401e2f384cf20b&page=1");

  // const movies = results.results;

  //   getMovies(urltest);

  //   async function getMovies(url) {
  //   const res = await fetch(url);
  //   const data = await res.json();

  //   showMovies(data.results);
  //   //data.results är argumentet
  //  }

  // ska vi mappa vid 0? 
  // console.log(results.results[0].original_title)

  return (
    <div>
      <p>Movie list...</p>

      {/* <div>{results.results && results.results.map((movie) => {
        <p> {movie.original_title} </p>
      })}</div> */}
    </div>
  );
}

export default MovieList;


// const API_URL =
//   "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1b0fe85392a0de289e401e2f384cf20b&page=1";
// const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
// const SEARCH_API =
//   'https://api.themoviedb.org/3/search/movie?api_key=1b0fe85392a0de289e401e2f384cf20b&query="';
// const main = document.getElementById("main");
// const form = document.getElementById("form");
// const search = document.getElementById("search");
// const searchButton = document.querySelector(".search-button");


// //Get initial movies
// getMovies(API_URL);

// async function getMovies(url) {
//   const res = await fetch(url);
//   const data = await res.json();

//   showMovies(data.results);
//   //data.results är argumentet
// }

// //(movies) = data.results fast med nytt coolt namn. parameter
// function showMovies(movies) {
//   main.innerHTML = "";

//   movies.forEach((movie) => {
//     const { title, poster_path, vote_average, overview } = movie;

//     const movieEl = document.createElement("div");
//     movieEl.classList.add("movie");

//     movieEl.innerHTML = `
//         <img 
//           src="${IMG_PATH + poster_path}"
//           alt="${title}"
//         />
//         <div class="movie-info">
//           <h3>${title}</h3>
//           <span class="${getClassByRate(vote_average)}">${vote_average}</span>
//         </div>
//         <div class="overview">
//           <h3>Overview</h3>
//           ${overview}
//         </div>
//       `;

//     main.appendChild(movieEl);
//   });
// }