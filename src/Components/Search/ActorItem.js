import React from "react";
import styled from "styled-components";

const ActorItemCard = styled.section`
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

const IMAGE_URL = "https://image.tmdb.org/t/p/original";

const ActorItem = ({ id, title, name, profilePath, knownFor, releaseDate }) => {
  return (
    <ActorItemCard>
      <img src={IMAGE_URL + profilePath} alt="" />
      <h2>{name}</h2>
      <p>
        Actor/Actress
        {knownFor[0] && !!knownFor[0].title ? (
          <span>, {knownFor[0].title} </span>
        ) : (
          ""
        )}
        {knownFor[0] && !!knownFor[0].releaseDate ? (
          <span> ({knownFor[0].releaseDate.substring(0, 4)}) </span>
        ) : (
          ""
        )}
      </p>
    </ActorItemCard>
  );
};

export default ActorItem;
