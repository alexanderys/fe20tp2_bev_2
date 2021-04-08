import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { ItemCard } from "../StyledComponents";
import { IMAGE_URL } from "../../constants/urlParts";
import FallbackImage from "../FallbackImage";

function TvItem({
  id,
  name,
  posterPath,
  firstAirDate,
  voteAverage,
  overview
}) {
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
    }
  }, []);
  //useEffect checks if a movie exists in a watchlist, and then sets the list-state to true or false
  useEffect(() => {
    if (currentUser) {
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
        id: id,
        tvTitle: name,
        voteAverage: voteAverage,
        posterPath: posterPath,
        firstAirDate: firstAirDate

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
        id: id,
        tvTitle: name,
        voteAverage: voteAverage,
        posterPath: posterPath,
        firstAirDate: firstAirDate

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
      {posterPath ? (
        <img src={IMAGE_URL + posterPath} alt="" />
      ) : (
        <FallbackImage type={"tv"} />
      )}
      <h2>{name}</h2>

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

      <span>{firstAirDate ? firstAirDate.substring(0, 4) : ""}</span>
      {/* <span>{overview}</span> */}
      <span>{voteAverage}</span>
    </ItemCard>
  );
}

export default TvItem


/* const TvItem = ({ posterPath, firstAirDate, name, overview }) => {
  return (
    <ItemCard>
      {posterPath ? (
        <img src={IMAGE_URL + posterPath} alt="" />
      ) : (
        <FallbackImage type={"tv"} />
      )}
      <h2>{name}</h2>
      <span>{firstAirDate ? firstAirDate.substring(0, 4) : ""}</span>
      <span>{overview}</span>
      <span>{voteAverage}</span>
    </ItemCard>
  );
};

export default TvItem; */
