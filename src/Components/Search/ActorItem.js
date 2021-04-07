import React from "react";
import { ItemCard } from "../StyledComponents";
import { IMAGE_URL } from "../../constants/urlParts";
import FallbackImage from '../FallbackImage';

const ActorItem = ({ name, profilePath, knownFor }) => {
  return (
    <ItemCard>
      { profilePath ? <img src={IMAGE_URL + profilePath} alt="" /> : <FallbackImage type={'actor'} />}
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
