import styled from "styled-components";

export const ResultsGrid = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export const ItemCard = styled.section`
  max-width: 120px;
  max-height: 400px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: beige;
  margin: 5px;
  h2 {
    font-size: 1.3rem;
  }
  img {
    width: 100%;
  }
  p {
    font-size: 0.9rem;
  }
  button {
    font-family: inherit;
    background: none;
    border: 1px solid black;
  }
`;

export const MainInput = styled.input`
  width: 80vw;
  border-radius: 0;
  padding: 15px;
  border: 0;
  border-bottom: 1px black solid;
  font-size: 16px;
  &:focus {
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

export const PrimaryButton = styled.button`
    width: 80vw;
    font-family: inherit;
    font-size: 1.1rem;
    color: white;
    background: black;
    padding: 10px 30px;
    margin-top: 40vh;
    cursor: pointer;
`;

export const SecondaryButton = styled.button`
    width: 80vw;
    font-family: inherit;
    font-size: 1.1rem;
    background: none;
    border: 2px solid black;
    padding: 10px 30px;
    margin-top: 40vh;
    cursor: pointer;
`;