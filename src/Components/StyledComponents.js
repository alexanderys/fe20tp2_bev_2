import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    html {
        background-color: ${({ theme }) => theme.primaryBackground};
    }
  
  * {  
  box-sizing: border-box;
  margin: 0;
  padding: 0;
} 

 body {
  font-family: 'Lato', serif;
  /* border: 5px solid blue; */
} 
@media (min-width: 700px) {
    body {
     margin-top: 100px;
    }
  }

`;

// -------------------- ELEMENTS WITH STYLES THAT ARE USED MORE THAN ONCE-------------------------
export const ResultsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 0.5rem;

  /* fulhax för att få marginal till navbar */
  section:last-of-type {
    margin-bottom: 100px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }

  /* flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 90px;*/
`;

export const ItemCard = styled.section`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.secondaryColor};
  background-color: ${({ theme }) => theme.secondaryBackground};
  max-width: 120px;
  height: 300px;
  overflow: hidden;
  margin: 5px;
  border-radius: 3px;

  h2,
  h3 {
    overflow: hidden;
    min-height: 45px;
    font-size: 1.1rem;
    text-align: center;
    margin-bottom: 5px;
    max-width: 95%;
    margin: 0 auto;
  }

  img {
    width: 100%;
    height: 180px;
  }

  span {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    font-family: inherit;
    font-size: 1rem;
    margin-bottom: 4px;
    margin: 2px 6px;

    svg {
      transform: translateX(40%);
      height: 75%;
    }

    article {
      margin: 0 auto;
    }
  }

  button {
    color: ${({ theme }) => theme.secondaryColor};
    font-family: inherit;
    background: none;
    border: 1px solid ${({ theme }) => theme.secondaryColor};
    margin: 3px auto;
    cursor: pointer;
    width: 80%;
  }
`;

export const DetailsCard = styled.section`
  color: ${({ theme }) => theme.primaryColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.primaryColor};
  h1 {
    font-size: 1.8rem;
    text-align: center;
    margin: 10px 0;
  }
  img {
    width: 60%;
  }
  ul {
    list-style-type: none;
    width: 100%;
    text-align: center;

    li {
      display: inline;
    }
  }
  span {
    font-size: 1rem;
    margin-bottom: 10px;
  }
  p {
    width: 70vw;
    text-align: center;
    font-size: 1.1rem;
    padding: 10px 0;
    font-weight: 500;
  }
  button {
    padding: 10px;
    font-size: 1rem;
    background: none;
    color: ${({ theme }) => theme.primaryColor};
    border: 1px solid ${({ theme }) => theme.primaryColor};
  }
`;

export const PrimaryH2 = styled.h2`
  text-align: center;
  font-size: 1.6rem;
  margin-top: 150px;
  margin-bottom: 100px;
`;

export const PrimaryH3 = styled.h3`
  color: ${({ theme }) => theme.primaryColor};
  text-align: center;
  font-size: 1rem;
  margin-top: 40px;
  margin-bottom: 40px;
  & a {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.thirdColor};
  }
`;

// ------------------------------- FORMS ---------------------------------
export const PrimaryInput = styled.input`
  color: ${({ theme }) => theme.primaryColor};
  background-color: ${({ theme }) => theme.primaryBackground};
  width: 100%;
  display: block;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.primaryColor};
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
    color: ${({ theme }) => theme.secondaryColor};
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
  h1 {
    margin: 20px 0;
  }
  h3 {
    color: ${({ theme }) => theme.primaryColor};
  }

  color: ${({ theme }) => theme.primaryColor};
  background-color: ${({ theme }) => theme.primaryBackground};
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    color: ${({ theme }) => theme.primaryColor};
    align-self: flex-start;
    font-size: 0.9rem;
    text-decoration: none;
    padding-bottom: 1px;
  }
`;

export const SecondarySection = styled.section`
  //used by Profile-files + Stats
  color: ${({ theme }) => theme.primaryColor};
  background-color: ${({ theme }) => theme.primaryBackground};
  display: flex;
  flex-direction: column;
  align-items: center;
  /* height: 80vh; */
  //new

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
    color: ${({ theme }) => theme.primaryColor};
    display: flex;
    justify-content: space-between;
    text-decoration: none;
    border-bottom: 2px solid ${({ theme }) => theme.primaryColor};
    padding-bottom: 5px;
  }
  span {
    font-size: 1.3rem;
  }
  input {
    &::placeholder {
      color: ${({ theme }) => theme.thirdColor};
    }
  }
`;

export const StatsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #222222;
  h1 {
    /* color: ${({ theme }) => theme.primaryColor}; */
    color: white;
    font-size: 2rem;
    margin: 70px 0;
  }
  section {
    width: 90vw;
    margin: 0 0 60px 0;
  }

  span {
    /* color: ${({ theme }) => theme.primaryColor}; */
    color: white;
  }
  p {
    /* color: ${({ theme }) => theme.primaryColor}; */
    color: white;
  }
`;

// ------------------------------- BUTTONS ---------------------------------
export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;

  button:nth-of-type(1) {
    margin-top: 10px;
  }

  button + button {
    margin-top: 5px;
  }
`;

export const PrimaryButton = styled.button`
  color: ${({ theme }) => theme.primaryColor};
  width: 80vw;
  margin-top: 130px;
  margin-bottom: 10px;
  font-family: inherit;
  font-size: 1.1rem;
  background: none;
  border: 2px solid ${({ theme }) => theme.primaryColor};
  padding: 10px 30px;
  cursor: pointer;
`;

export const SecondaryButton = styled.button`
  color: ${({ theme }) => theme.primaryColor};
  width: 100%;
  margin-top: 70px;
  margin-bottom: 10px;
  font-family: inherit;
  font-size: 1.1rem;
  background: none;
  border: 2px solid ${({ theme }) => theme.secondaryColor};
  padding: 10px 30px;
  cursor: pointer;
`;

export const GoBackButton = styled.i`
  color: ${({ theme }) => theme.primaryColor};
  align-self: flex-start;
  margin-top: 30px;
  margin-left: 30px;
  font-size: 1.5rem;
  cursor: pointer;
`;

// ------------------------------- SEARCH --------------------------------

export const SearchForm = styled.form`
  background-color: #343434;
  width: 100vw;
  display: flex;
`;

export const SearchLabel = styled.label`
  width: 90%; /* new */
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #343434;
`;

export const SearchInput = styled.input`
  /* width: 95vw; */
  width: 95%; /* new */
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

export const SearchButton = styled.button`
  width: 5%;
  min-width: fit-content;
  margin: 10px;
  padding: 10px;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
`;

// ------------------------------- PAGINATION --------------------------------

export const PaginationNumbers = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;

  li {
    margin: 10px 5px;
    font-size: 1.1rem;
  }
  li a {
    text-decoration: none;
    color: black;
  }
  li a:focus {
    text-decoration: underline;
  }
`;

// ------------------------------- STATS --------------------------------
export const CircleStats = styled.div`
  width: 80px;
  height: 80px;
  margin: 15px 0;
  padding: 30px;
  border-radius: 50%;
  font-size: 2rem;
  background-color: rgba(255, 206, 86, 0.8);
`;

export const SquareStats = styled.div`
  width: 60px;
  height: 60px;
  margin: 15px 0;
  padding: 30px;
  font-size: 2rem;
  background-color: rgba(54, 162, 235, 0.2);
`;

export const StatsContainer = styled.div`
  color: white;
  background-color: #222222;

  border: 2px solid green;
  display: flex;
  justify-content: space-between;
  align-items: space-between;
  div {
    border: 2px solid red;
  }
  span {
    border: 2px solid yellow;
  }
`;
