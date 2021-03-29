import React from "react";
import styled from "styled-components";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

const MovieItemCard = styled.section`
  max-width: 300px;
  max-height: 500px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: beige;
  margin: 10px;
  padding: 10px;
  h2 {
    font-size: 1.5rem;
  }
  img {
    width: 220px;
  }
  p {
    font-size: 0.9rem;
  }
  button {
    max-width: 100px;
  }
`;

function MovieItem({ id, title, overview, voteAverage, imgComboPath }) {
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
    //id = the MovieItem-prop. we need toString() because FB only accepts documents id's as strings
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

  return (
    <MovieItemCard>
      <img src={imgComboPath} alt="" />
      <h2>{title}</h2>
      <button onClick={addToHaveWatched}>Add</button>
      <button onClick={removeFromHaveWatched}>Remove </button>
      <span>{voteAverage}</span>
      {/* <span>{releaseDate.substring(0, 4)}</span> */}
      <strong>Overview</strong>
      <p>{overview}</p>
    </MovieItemCard>
  );
}

export default MovieItem;
