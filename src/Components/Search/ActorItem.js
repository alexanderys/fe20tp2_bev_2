import React from "react";
import { ItemCard } from "../StyledComponents";

const IMAGE_URL = "https://image.tmdb.org/t/p/original";

const ActorItem = ({ id, title, name, profilePath, knownFor, releaseDate }) => {
  return (
    <ItemCard>
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
    </ItemCard>
  );
};

export default ActorItem;
