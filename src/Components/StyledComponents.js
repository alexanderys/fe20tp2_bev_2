import styled from "styled-components";

export const ResultsGrid = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export const ItemCard = styled.section`
  max-width: 110px;
  max-height: 400px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: beige;
  margin: 5px;
  padding: 10px;
  h2 {
    font-size: 1.5rem;
  }
  img {
    width: 100px;
  }
  p {
    font-size: 0.9rem;
  }
  button {
    max-width: 100px;
  }
`;
