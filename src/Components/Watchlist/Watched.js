import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import MovieItem from "../Search/MovieItem";
import TvItem from "../Search/TvItem";
import {
  GoBackButton,
  PrimarySection,
  ResultsGrid,
  PrimaryH3,
} from "../StyledComponents";

export const Watched = () => {
  const { currentUser } = useAuth();
  const [watchedContent, setWatchedContent] = useState([]);
  const history = useHistory();

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
        setWatchedContent(documents);
      });
  }, []);

  return (
    <PrimarySection>
      <GoBackButton
        onClick={() => history.goBack()}
        className="fas fa-angle-left"
      ></GoBackButton>

      <h1>Have Watched</h1>

      {watchedContent.length > 0 ? (
        <PrimaryH3>
          {" "}
          {watchedContent.length}{" "}
          {watchedContent.length === 1 ? "movie" : "movies"}
        </PrimaryH3>
      ) : (
        " "
      )}

      {watchedContent.length > 0 ? (
        <>
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
                genre_ids,
              }) => {
                if (movieTitle) {
                  return (
                    <MovieItem
                      id={id}
                      key={id}
                      title={movieTitle}
                      releaseDate={releaseDate}
                      posterPath={posterPath}
                      voteAverage={voteAverage}
                      genreIds={genre_ids}
                    />
                  );
                } else if (tvTitle) {
                  return (
                    <TvItem
                      id={id}
                      key={id}
                      name={tvTitle}
                      firstAirDate={firstAirDate}
                      posterPath={posterPath}
                      voteAverage={voteAverage}
                    />
                  );
                }
                return <></>;
              }
            )}
          </ResultsGrid>
        </>
      ) : (
        <PrimaryH3>
          No content in your list! Search for movies
          <Link to="/search"> here </Link>
        </PrimaryH3>
      )}
    </PrimarySection>
  );
};

export default Watched;
