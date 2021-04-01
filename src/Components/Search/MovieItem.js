import React from "react";
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
      });
  };

  const removeFromHaveWatched = () => {
    db.collection("users")
      .doc(currentUser.uid)
      .collection("haveWatched")
      .doc(id.toString())
      .delete();
  };

  const addToWatchlist = () => {
    db.collection('users')
      .doc(currentUser.uid)
      .collection('watchlist')
      .doc(id.toString())
      .set({
        movieTitle: title,
        voteAverage: voteAverage
      });
  }

  const removeFromWatchlist = () => {
    db.collection("users")
      .doc(currentUser.uid)
      .collection("watchlist")
      .doc(id.toString())
      .delete();
  };

  return (
    <ItemCard>
      <img src={imgComboPath} alt="" />
      <h2>{title}</h2>
      {/* {buttons.map((button) => (
        <button onClick={button.function}>{button.text}</button>
      ))} */}
      <button onClick={addToWatchlist}>Add to Watchlist</button>
      <button onClick={removeFromWatchlist}>Remove from Watchlist</button>
      <button onClick={addToHaveWatched}>Add to Have Watched</button>
      <button onClick={removeFromHaveWatched}>Remove from Have Watched</button>
      <span>{voteAverage}</span>
      {/* <span>{releaseDate.substring(0, 4)}</span> */}
      <strong>Overview</strong>
      <p>{overview}</p>
    </ItemCard>
  );
}

export default MovieItem;
