import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import MovieItem from '../Search/MovieItem';
import TvItem from '../Search/TvItem';
import { GoBackButton, PrimarySection, ResultsGrid, PrimaryH3 } from '../StyledComponents';
import * as URL from '../../constants/urlParts';

export const Watchlist = () => {
  const { currentUser } = useAuth();
  const [contentInWatchlist, setContentInWatchlist] = useState([]);
  const history = useHistory();

  useEffect(() => {
    db.collection('users')
      .doc(currentUser.uid)
      .collection('watchlist')
      .get()
      //this is async, so it returns a promise
      .then((snapshot) => {
        let documents = [];
        snapshot.docs.forEach((doc) => {
          documents.push(doc.data());
        });
        setContentInWatchlist(documents);
      });
  }, []);

  return (
    <>
      <div>
        <PrimarySection>

          <GoBackButton
            onClick={() => history.goBack()}
            className="fas fa-angle-left"
          ></GoBackButton>

          <h1>My Watchlist</h1>

          <PrimaryH3>
            {'You have ' + contentInWatchlist.length + ' '}
            {contentInWatchlist.length === 1 ? 'title' : 'titles'}
            {' in your watchlist'}
          </PrimaryH3>

        </PrimarySection>
      </div>

      <br />

      {contentInWatchlist.length > 0 ? (
        <>
          <hr />
          <ResultsGrid>
            {contentInWatchlist.map(
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
        <PrimaryH3>No content in your list! Search for movies
          <Link to='/search'>{' '}here{' '}</Link>
        </PrimaryH3>
      )}
    </>
  );
};

export default Watchlist;
