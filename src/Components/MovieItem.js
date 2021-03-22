import React from "react";
import styled from "styled-components";

const MovieItemSection = styled.section`
  max-width: 300px;
  max-height: 550px;
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
  }
  p {
    font-size: 0.9rem;
  }
`;

function MovieItem({
  id,
  title,
  overview,
  vote_average,
  poster_path,
  imgComboPath,
}) {
  return (
    <MovieItemSection>
      <img src={imgComboPath} alt="" />
      <h2>{title}</h2>
      <span>{vote_average}</span>
      <strong>Overview</strong>
      <p>{overview}</p>
    </MovieItemSection>
  );
}

export default MovieItem;
