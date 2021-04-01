import styled from "styled-components";

export const ResultsGrid = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border: 5px solid purple;
`;

export const ItemCard = styled.section`
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
