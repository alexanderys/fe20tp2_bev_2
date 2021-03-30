import React, { useContext, useEffect, useState } from "react";
import { globalContext } from "../../context/GlobalState";
import MovieItem from "../Search/MovieItem";
import styled from "styled-components";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";

const MovieListGrid = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border: 2px solid yellow;
`;

export const Watched = () => {
  const IMAGE_URL = "https://image.tmdb.org/t/p/w1280";
  const { watched } = useContext(globalContext);
  const { currentUser } = useAuth();
  const [watchedMovies, setWatchedMovies] = useState([]);

  // const GetNextReviews = async () => {
  //   const ref = db
  //     .collection("users")
  //     .doc(currentUser.uid)
  //     .collection("haveWatched");
  //   const data = await ref.get();
  //   console.log("this is data: " + data);

  //   //data.docs = an array of all the documents
  //   data.docs.forEach((doc) => {
  //     const review = doc.data();
  //     console.log("this is review: " + review);
  //   });
  // };

  // GetNextReviews();
  useEffect(() => {
    db.collection("users")
      .doc(currentUser.uid)
      .collection("haveWatched")
      .get()
      //this is async, so it returns a promise
      .then((snapshot) => {
        let documents = [];
        snapshot.docs.forEach((doc) => {
          documents.push(doc.data().movieTitle);
        });
        setWatchedMovies(documents);
      });
  }, []);

  console.log(watchedMovies);

  return (
    <div>
      <div className="header">
        <h1>Watched Movies</h1>
        <h2>{currentUser.uid}</h2>
        <h2>{watchedMovies}</h2>

        <h3 className="count-pill">
          {watched.length} {watched.length === 1 ? "Movie" : "Movies"}
        </h3>
      </div>

      {watched.length > 0 ? (
        <MovieListGrid>
          {watched.map(
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
                imgComboPath={IMAGE_URL + poster_path}
                type="watched"
              />
            )
          )}
        </MovieListGrid>
      ) : (
        <h2>No movies in your list! Add some!</h2>
      )}
    </div>
  );
};
