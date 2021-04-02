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

export const MainInput = styled.input`
  width: 80vw;
  border-radius: 0;
  padding: 15px;
  border: 0;
  border-bottom: 1px black solid;
  font-size: 16px;
  &:focus{
    outline: none;
  }
`;

export const MainH2 = styled.h2`
  text-align: center;
`;

export const MainSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  //background-color: #b5b5ff;
  //This height is stupid, change later
  height: 88vh;
`;

export const MainButton = styled.button`
  
`;