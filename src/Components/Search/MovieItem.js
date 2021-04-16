import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { IMAGE_URL } from "../../constants/urlParts";
import { ItemCard } from "../StyledComponents";
import FallbackImage from "../FallbackImage";
import { genresList } from "../Stats/Genres";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons'

function MovieItem({
  id,
  title,
  voteAverage,
  posterPath,
  releaseDate,
  genreIds,
}) {
  const { currentUser } = useAuth();
  const [inHaveWatched, setInHaveWatched] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(false);
  //the add-to-list-buttons checks these list states ^ to see if a specific movie is included

  const genreNames = genreIds?.map((genreId) => {
    //? kollar om genreIds finns/laddar - om inte så sätter den genreNames till null
    return genresList.find(
      (genreIdAndNameObj) => genreIdAndNameObj.id === genreId
    ).name;
  });
 
  useEffect(() => {
    if (currentUser) {
      db.collection("users")
        .doc(currentUser.uid)
        .collection("haveWatched")
        .doc(id.toString())
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setInHaveWatched(true);
          } else {
            setInHaveWatched(false);
          }
        });
      db.collection("users")
        .doc(currentUser.uid)
        .collection("watchlist")
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
    db.collection("users")
      .doc(currentUser.uid)
      .collection("haveWatched")
      .doc(id.toString())
      .set({
        id,
        movieTitle: title,
        voteAverage,
        posterPath,
        releaseDate,
        createdAt: Date.now(),
        genreNames,
        addedDate: new Date().toISOString(),
      })
      .then(() => {
        setInHaveWatched(true);
      });
  };

  const removeFromHaveWatched = () => {
    db.collection("users")
      .doc(currentUser.uid)
      .collection("haveWatched")
      .doc(id.toString())
      .delete()
      .then(() => {
        setInHaveWatched(false);
      });
  };

  const addToWatchlist = () => {
    db.collection("users")
      .doc(currentUser.uid)
      .collection("watchlist")
      .doc(id.toString())
      .set({
        id,
        movieTitle: title,
        voteAverage,
        posterPath,
        releaseDate,
        createdAt: Date.now(),
      })
      .then(() => {
        setInWatchlist(true);
      });
  };

  const removeFromWatchlist = () => {
    db.collection("users")
      .doc(currentUser.uid)
      .collection("watchlist")
      .doc(id.toString())
      .delete()
      .then(() => {
        setInWatchlist(false);
      });
  };

  return (
    <ItemCard>
      <Link to={`movie/${id}`}>
        {posterPath ? (
          <img src={IMAGE_URL + posterPath} alt="" />
        ) : (
          <FallbackImage type={"movie"} />
        )}
      </Link>

      <h3>{title}</h3>

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

      <span>{releaseDate ? releaseDate.substring(0, 4) : ""}</span>
      <span>{voteAverage}</span>
    </ItemCard>
  );
}

export default MovieItem;
