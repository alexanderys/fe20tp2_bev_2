import React, { useContext, useEffect, useState } from "react";
//import { globalContext } from "../../context/GlobalState";
//import MovieItem from "../Search/MovieItem";
import styled from "styled-components";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import axios from 'axios';
import * as CONSTS from '../../constants/consts';

const MovieListGrid = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border: 2px solid yellow;
`;

export const Watched = () => {
  const IMAGE_URL = "https://image.tmdb.org/t/p/w1280";
  //const { watched } = useContext(globalContext);
  const { currentUser } = useAuth();
  const [watchedMoviesId, setWatchedMoviesId] = useState([]);
  const [TestMovies, setTestMovies] = useState();

  //Makes the state watchedMoviesId into an array of all the movie id's
  //of the movies in currentUsers haveWatched list.
  useEffect(() => {
    db.collection("users")
      .doc(currentUser.uid)
      .collection("haveWatched")
      .get()
      //this is async, so it returns a promise
      .then((snapshot) => {
        let documents = [];
        snapshot.docs.forEach((doc) => {
          documents.push(doc.id);
        });
        setWatchedMoviesId(documents);
      });
  }, []);

  //Temporary API import for displaying the movies in currentUsers
  //haveWatched list
  axios.get(CONSTS.BASE_URL + /* Movie id ??? */ + CONSTS.API_KEY + CONSTS.SETTINGS).then((res) => {
    //setTestMovies(res.data.results);
    console.log(res.data.results);
  });

  return (
    <div>
      <h1>hej</h1>
      {/* <div className="header">
        <h1>Watched Movies</h1>
        <h2>Current user id = {currentUser.uid}</h2>
        <br />


        <h3 className="count-pill">
          {watchedMoviesId.length} {watchedMoviesId.length === 1 ? "Movie" : "Movies"}
        </h3>
      </div>

      {watchedMoviesId.length > 0 ? (
        <MovieListGrid>
          {TestMovies.map(
            ({
              id,
              title,
              overview,
              vote_average,
              poster_path,
              release_date,
            }) => (
              <MovieItem
                title={title}
                key={id}
                overview={overview}
                voteAverage={vote_average}
                releaseDate={release_date}
                posterPath={poster_path}
                imgComboPath={CONSTS.IMAGE_URL + poster_path}
                type="watched"
              />
            )
          )}
        </MovieListGrid>
      ) : (
        <h2>No movies in your list! Add some!</h2>
      )} */}
    </div>
  );
};
