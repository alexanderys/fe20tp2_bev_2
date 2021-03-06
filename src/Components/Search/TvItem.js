import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { ItemCard } from '../StyledComponents';
import { IMAGE_URL } from '../../constants/urlParts';
import FallbackImage from '../FallbackImage';
import { Link } from 'react-router-dom';
import { faPlus, faCheck, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TvItem({
  id,
  name,
  posterPath,
  firstAirDate,
  overview,
  title,
  releaseDate,
}) {
  const { currentUser } = useAuth();
  const [inHaveWatched, setInHaveWatched] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(false);

  //the add-to-list-buttons checks these list states ^ to see if a specific movie is included
  useEffect(() => {
    if (currentUser) {
      db.collection('users')
        .doc(currentUser.uid)
        .collection('haveWatched')
        .doc(id.toString())
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setInHaveWatched(true);
          } else {
            setInHaveWatched(false);
          }
        });
      db.collection('users')
        .doc(currentUser.uid)
        .collection('watchlist')
        .doc(id.toString())
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setInWatchlist(true);
          } else {
            setInWatchlist(false);
          }
        });
    }
  }, []);

  const addToHaveWatched = () => {
    // db.collection("haveWatched").add({...}) = gives a random Firestore-ID to the document
    // id = the MovieItem-prop. we need toString() because FB only accepts documents id's as strings
    db.collection('users')
      .doc(currentUser.uid)
      .collection('haveWatched')
      .doc(id.toString())
      .set({
        id,
        tvTitle: name,
        posterPath,
        firstAirDate,
      })
      .then(() => {
        setInHaveWatched(true);
      });
  };

  const removeFromHaveWatched = () => {
    db.collection('users')
      .doc(currentUser.uid)
      .collection('haveWatched')
      .doc(id.toString())
      .delete()
      .then(() => {
        setInHaveWatched(false);
      });
  };

  const addToWatchlist = () => {
    db.collection('users')
      .doc(currentUser.uid)
      .collection('watchlist')
      .doc(id.toString())
      .set({
        id,
        tvTitle: name,
        // voteAverage,
        posterPath,
        firstAirDate,
      })
      .then(() => {
        setInWatchlist(true);
      });
  };

  const removeFromWatchlist = () => {
    db.collection('users')
      .doc(currentUser.uid)
      .collection('watchlist')
      .doc(id.toString())
      .delete()
      .then(() => {
        setInWatchlist(false);
      });
  };

  return (
    <ItemCard>
      <Link to={`tv/${id}`}>
        {posterPath ? (
          <img src={IMAGE_URL + posterPath} alt='' />
        ) : (
          <FallbackImage type={'tv'} />
        )}
      </Link>
      <h3>{name}</h3>

      <span>
        {firstAirDate ? firstAirDate.substring(0, 4) : ''}
        <FontAwesomeIcon icon={faStar} size='1x' color='' />
      </span>

      {inWatchlist
        ? currentUser && (
            <button onClick={removeFromWatchlist}>
              <FontAwesomeIcon icon={faCheck} /> Watchlist
            </button>
          )
        : currentUser && (
            <button onClick={addToWatchlist}>
              <FontAwesomeIcon icon={faPlus} /> Watchlist
            </button>
          )}

      {inHaveWatched
        ? currentUser && (
            <button onClick={removeFromHaveWatched}>
              <FontAwesomeIcon icon={faCheck} /> Seen
            </button>
          )
        : currentUser && (
            <button onClick={addToHaveWatched}>
              <FontAwesomeIcon icon={faPlus} /> Seen
            </button>
          )}
    </ItemCard>
  );
}

export default TvItem;
