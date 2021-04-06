import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { ItemCard } from "../StyledComponents";

function MovieItem({
  id,
  title,
  overview,
  voteAverage,
  imgComboPath,
  buttons,
}) {
  const { currentUser } = useAuth();
  // const [toggleState, setToggleState] = useState("Add to Watched");
  // function toggle() {
  //   setToggleState(
  //     toggleState === "Add to Watched"
  //       ? "Remove from Watched"
  //       : "Add to Watched"
  //   )}

  const [inHaveWatched, setInHaveWatched] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(false);

  /*   useEffect(async () => {
      const inHW = await db.collection("users")
        .doc(currentUser.uid)
        .collection("haveWatched")
        .doc(id.toString());
  
      console.log(inHW);
    }, []) */

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
        })
    }
  }, [])

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
        })
    }
  }, [])


  const addToHaveWatched = () => {
    // db.collection("haveWatched").add({...}) = gives a random FB-ID to the document
    // id = the MovieItem-prop. we need toString() because FB only accepts documents id's as strings
    db.collection("users")
      .doc(currentUser.uid)
      .collection("haveWatched")
      .doc(id.toString())
      .set({
        movieTitle: title,
        voteAverage: voteAverage,
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
        movieTitle: title,
        voteAverage: voteAverage
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
        <img src={imgComboPath} alt="" />{" "}
      </a>

      <h2>{title}</h2>
      {/* {buttons.map((button) => (
        <button onClick={button.function}>{button.text}</button>
      ))} */}
      {inWatchlist ? (
        (currentUser && <button onClick={removeFromWatchlist}>Remove from Watchlist</button>)
      ) : (
        (currentUser && <button onClick={addToWatchlist}>Add to Watchlist</button>)
      )}

      {inHaveWatched ? (
        (currentUser && <button onClick={removeFromHaveWatched}>Remove from Have Watched</button>)
      ) : (
        (currentUser && <button onClick={addToHaveWatched}>Add to Have Watched</button>)
      )}

      <span>{voteAverage}</span>
      {/* <span>{releaseDate.substring(0, 4)}</span> */}
      <strong>Overview</strong>
      <p>{overview}</p>
    </ItemCard>
  );
}

export default MovieItem;
