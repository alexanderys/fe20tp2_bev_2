import styled from "styled-components";
import { useState } from 'react';

// ------------------------------- COLOR VARIABLES ---------------------------------
const primaryColor = "black";
const secondaryColor = "white";

// -------------------- ELEMENTS WITH STYLES THAT ARE USED MORE THAN ONCE-------------------------
export const ResultsGrid = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export const ItemCard = styled.section`
  max-width: 120px;
  max-height: 300px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: beige;
  margin: 5px;
  h2 {
    font-size: 1.3rem;
    text-align: center;
    margin-bottom: 5px;
  }
  img {
    width: 100%;
  }
  span {
    font-size: 1rem;
    margin-bottom: 15px;
  }
  button {
    font-family: inherit;
    background: none;
    border: 1px solid ${primaryColor};
    margin: 3px 0;
  }
`;

export const PrimaryH2 = styled.h2`
  text-align: center;
  font-size: 1.6rem;
  margin-top: 150px;
  margin-bottom: 100px;
`;

// ------------------------------- FORMS ---------------------------------
export const PrimaryInput = styled.input`
  width: 100%;
  display: block;
  border: none;
  border-bottom: 2px solid ${primaryColor};
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

export const PrimaryLabel = styled.label`
  font-size: 1.3rem;
  font-weight: 600;
`;

export const PrimaryForm = styled.form`
  width: 80vw;
`;

// ------------------------------- SECTIONS ---------------------------------
export const PrimarySection = styled.section`
  //used by Authentication-files
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    align-self: flex-start;
    color: ${primaryColor};
    font-size: 0.9rem;
    text-decoration: none;
    border-bottom: 1px solid black;
    padding-bottom: 1px;
  }
`;

export const SecondarySection = styled.section`
  //used by Profile-files + Stats
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: 2rem;
    text-align: center;
    margin: 70px 0;
  }
  li {
    list-style: none;
    font-size: 1.3rem;
    font-weight: 600;
    margin: 15px 0;
    width: 80vw;
    display: block;
  }
  li a {
    display: flex;
    justify-content: space-between;
    color: ${primaryColor};
    text-decoration: none;
    border-bottom: 2px solid ${primaryColor};
    padding-bottom: 5px;
  }
  span {
    font-size: 1.3rem;
  }
`;

// ------------------------------- BUTTONS ---------------------------------
export const PrimaryButton = styled.button`
  width: 80vw;
  margin-top: 150px;
  margin-bottom: 10px;
  font-family: inherit;
  font-size: 1.1rem;
  background: none;
  border: 2px solid ${primaryColor};
  padding: 10px 30px;
  cursor: pointer;
`;

export const SecondaryButton = styled.button`
  width: 80vw;
  margin-top: 90px;
  margin-bottom: 10px;
  font-family: inherit;
  font-size: 1.1rem;
  background: none;
  border: 2px solid ${primaryColor};
  padding: 10px 30px;
  cursor: pointer;
`;

export const GoBackButton = styled.i`
  align-self: flex-start;
  margin-top: 30px;
  margin-left: 30px;
  font-size: 1.5rem;
`;

// ------------------------------- SEARCH --------------------------------
export const SearchLabel = styled.label`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2b2b2b;
`;

export const SearchInput = styled.input`
  width: 95vw;
  border-radius: 5px;
  padding: 15px;
  border: 0;
  font-size: 1rem;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-style: italic;
  }
`;
