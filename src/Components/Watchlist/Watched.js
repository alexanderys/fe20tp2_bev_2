import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import MovieItem from "../Search/MovieItem";
import TvItem from "../Search/TvItem";
import { ResultsGrid } from "../StyledComponents";
import * as URL from "../../constants/urlParts";

export const Watched = () => {
  const { currentUser } = useAuth();
  const [watchedContent, setWatchedContent] = useState([]);

  useEffect(() => {
    db.collection("users")
      .doc(currentUser.uid)
      .collection("haveWatched")
      .get()
      //this is async, so it returns a promise
      .then((snapshot) => {
        let documents = [];
        snapshot.docs.forEach((doc) => {
          documents.push(doc.data());
        });
        //gör anrop till API för att få data
        setWatchedContent(documents);
      });
  }, []);

  return (
    <div>
      <div>
        <h1>Watched Titles</h1>
        <strong>User email: </strong> {currentUser.email}
        <br />
        <strong>UID: </strong>
        {currentUser.uid}
        <hr /> <br />
        <h3>
          {watchedContent.length}{" "}
          {watchedContent.length === 1 ? "title" : "titles"}
        </h3>
      </div>

      {watchedContent.length > 0 ? (
        <>
          <hr />
          <ResultsGrid>
            {watchedContent.map(
              ({
                id,
                movieTitle,
                tvTitle,
                releaseDate,
                firstAirDate,
                posterPath,
                voteAverage,
              }) => {
                if (movieTitle) {
                  return (
                    <MovieItem
                      id={id}
                      title={movieTitle}
                      releaseDate={releaseDate}
                      posterPath={posterPath}
                      voteAverage={voteAverage}
                    />
                  );
                } else if (tvTitle) {
                  return (
                    <TvItem
                      id={id}
                      name={tvTitle}
                      firstAirDate={firstAirDate}
                      posterPath={posterPath}
                      voteAverage={voteAverage}
                    />
                  );
                }
              }
            )}
          </ResultsGrid>
        </>
      ) : (
        <h2>No content in your list! Add some!</h2>
      )}
    </div>
  );
};

export default Watched;
