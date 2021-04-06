import styled from "styled-components";

/* =========
COLOR VARIABLES 
===========*/
const primaryColor = 'black';
const secondaryColor = 'white';

/* =========
ELEMENTS WITH STYLES THAT ARE USED MORE THAN ONCE
===========*/
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
  width: 100%;
  display: block;
  border: none;
  border-bottom: 2px ${primaryColor} solid;
  padding: 10px 1px;
  margin-bottom: 35px;
  font-size: 1.2rem;
  font-weight: 400;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: 1.2rem;
    font-style: italic;
    color: #a6a6a6;
  }
`;

export const MainLabel = styled.label`
  font-size: 1.3rem;
  font-weight: 600;
`;

export const MainH2 = styled.h2`
  text-align: center;
  font-size: 1.6rem;
  margin-top: 150px;
  margin-bottom: 100px;
`;

export const MainForm = styled.form`
  width: 80vw;
`;

export const MainSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    align-self: flex-start;
    color: black;
    font-size: 0.9rem;
    text-decoration: none;
    border-bottom: 1px solid black;
    padding-bottom: 1px;
  }
`;

export const MainButton = styled.button`
  width: 100%;
  margin-top: 150px;
  margin-bottom: 10px;
  font-family: inherit;
  font-size: 1.1rem;
  background: none;
  border: 2px solid black;
  padding: 10px 30px;
`;

export const GoBackButton = styled.i`
  align-self: flex-start;
  margin-top: 30px;
  margin-left: 30px;
  font-size: 1.5rem;
`;
export const PrimaryButton = styled.button`
    width: 80vw;
    font-family: inherit;
    font-size: 1.1rem;
    color: ${secondaryColor};
    background: ${primaryColor};
    padding: 10px 30px;
    margin-top: 40vh;
    cursor: pointer;
`;

export const SecondaryButton = styled.button`
    width: 80vw;
    font-family: inherit;
    font-size: 1.1rem;
    background: none;
    border: 2px solid ${primaryColor};
    padding: 10px 30px;
    margin-top: 20vh;
    cursor: pointer;
`;
