import React from "react";
import styled from "styled-components";

const TVItemCard = styled.section`
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

const TvItem = ({ id, title, posterPath, firstAirDate, name, overview }) => {
  return (
    <TVItemCard>
      <img src={IMAGE_URL + posterPath} alt="" />
      <h2>{name}</h2>
      <span>{firstAirDate ? firstAirDate.substring(0, 4) : ""}</span>
      <span>{overview}</span>
    </TVItemCard>
  );
};

export default TvItem;
