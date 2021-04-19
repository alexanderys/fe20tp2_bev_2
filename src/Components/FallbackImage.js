import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faFilm } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const StyledDiv = styled.div`
  box-sizing: border-box;
  width: 120px;
  min-height: 180px;
  max-height: 180px;
  background-color: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FallbackImage = ({ type }) => {
  if (type === "movie" || type === "tv") {
    return (
      <StyledDiv>
        <FontAwesomeIcon icon={faFilm} size="3x" color="grey" />
      </StyledDiv>
    );
  } else {
    return (
      <StyledDiv>
        <FontAwesomeIcon icon={faUser} size="3x" color="grey" />
      </StyledDiv>
    );
  }
};

export default FallbackImage;
