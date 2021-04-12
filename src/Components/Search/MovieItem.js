import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { IMAGE_URL } from "../../constants/urlParts";
import { ItemCard } from "../StyledComponents";
import FallbackImage from "../FallbackImage";

function MovieItem({ id, title, voteAverage, posterPath, releaseDate }) {
  const { currentUser } = useAuth();
  const [inHaveWatched, setInHaveWatched] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(false);

  //the add-to-list-buttons checks these list states ^ to see if a specific movie is included
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
      <a href={`movies/${id}`}>
        {posterPath ? (
          <img src={IMAGE_URL + posterPath} alt="" />
        ) : (
          <FallbackImage type={"movie"} />
        )}
      </a>

      <h2>{title}</h2>

      {inWatchlist
        ? currentUser && (
            <button onClick={removeFromWatchlist}>Remove from Watchlist</button>
          )
        : currentUser && (
            <button onClick={addToWatchlist}>Add to Watchlist</button>
          )}

      {inHaveWatched
        ? currentUser && (
            <button onClick={removeFromHaveWatched}>
              Remove from Have Watched
            </button>
          )
        : currentUser && (
            <button onClick={addToHaveWatched}>Add to Have Watched</button>
          )}

      <span>{releaseDate ? releaseDate.substring(0, 4) : ""}</span>
      <span>{voteAverage}</span>
    </ItemCard>
  );
}

export default MovieItem;
