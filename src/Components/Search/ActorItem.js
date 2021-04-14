import React from "react";
import { ItemCard } from "../StyledComponents";
import { IMAGE_URL } from "../../constants/urlParts";
import FallbackImage from '../FallbackImage';
import { Link } from 'react-router-dom';

const ActorItem = ({ id, name, profilePath, knownFor }) => {
  return (
    <ItemCard>
      <Link to={`actor/${id}`}>
        {profilePath ? (
          <img src={IMAGE_URL + profilePath} alt="" />
        ) : (
          <FallbackImage type={"actor"} />
        )}
      </Link>

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
