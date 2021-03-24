import React from "react";
import styled from "styled-components";

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
    width: 250px;
    border: 3px solid orange;
  }
  img:hover {
    border: 3px solid blue;
  }
  p {
    font-size: 0.9rem;
  }
`;

function MovieItem({
  id,
  title,
  overview,
  voteAverage,
  imgComboPath,
  // releaseDate,
}) {
  return (
    <MovieItemCard>
      <img src={imgComboPath} alt="" />
      <h2>{title}</h2>
      <span>{voteAverage}</span>
      {/* <span>{releaseDate.substring(0, 4)}</span> */}
      <strong>Overview</strong>
      <p>{overview}</p>
    </MovieItemCard>
  );
}

export default MovieItem;
