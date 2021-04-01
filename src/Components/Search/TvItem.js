import React from "react";
import { ItemCard } from "../StyledComponents";

const IMAGE_URL = "https://image.tmdb.org/t/p/original";

const TvItem = ({ id, title, posterPath, firstAirDate, name, overview }) => {
  return (
    <ItemCard>
      <img src={IMAGE_URL + posterPath} alt="" />
      <h2>{name}</h2>
      <span>{firstAirDate ? firstAirDate.substring(0, 4) : ""}</span>
      <span>{overview}</span>
    </ItemCard>
  );
};

export default TvItem;
