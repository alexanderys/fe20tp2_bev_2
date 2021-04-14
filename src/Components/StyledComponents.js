import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    html {
        background-color: ${({ theme }) => theme.primaryBackground};
    }
`;

// -------------------- ELEMENTS WITH STYLES THAT ARE USED MORE THAN ONCE-------------------------
export const ResultsGrid = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export const ItemCard = styled.section`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.secondaryColor};
  background-color: ${({ theme }) => theme.secondaryBackground};
  max-width: 120px;
  max-height: 300px;
  overflow: hidden;
  margin: 5px;
  border-radius: 3px;
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
    color: ${({ theme }) => theme.secondaryColor};
    font-family: inherit;
    background: none;
    border: 1px solid ${({ theme }) => theme.secondaryColor};
    margin: 3px 0;
  }
`;

export const DetailsCard = styled.section`
  max-width: 100%;
  max-height: ;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px;
  h2 {
    font-size: 1.3rem;
    text-align: center;
    margin-bottom: 10px;
  }
  img {
    width: 50%;
    margin: 10px
  }
  ul {
    list-style-type: none;
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
    
    li {
      display: inline;
    }
  }
  span {
    font-size: 1rem;
    margin-bottom: 10px;
  }
  p {
    text-align: center;
    padding: 10px
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
  color: ${({ theme }) => theme.primaryColor};
  background-color: ${({ theme }) => theme.primaryBackground};
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
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
  height: 100vh;
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
`;

export const StatsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  h1 {
    color: ${({ theme }) => theme.primaryColor};
    font-size: 2rem;
    margin: 70px 0;
  }
  section {
    width: 90vw;
    margin: 0 0 60px 0;
  }
`;
// ------------------------------- BUTTONS ---------------------------------
export const PrimaryButton = styled.button`
  color: ${({ theme }) => theme.primaryColor};
  width: 80vw;
  margin-top: 150px;
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
  width: 80vw;
  margin-top: 90px;
  margin-bottom: 10px;
  font-family: inherit;
  font-size: 1.1rem;
  background: none;
  border: 2px solid ${({ theme }) => theme.secondaryColor};
  padding: 10px 30px;
  cursor: pointer;
`;

export const GoBackButton = styled.i`
  align-self: flex-start;
  margin-top: 30px;
  margin-left: 30px;
  font-size: 1.5rem;
  cursor: pointer;
`;

// ------------------------------- SEARCH --------------------------------
export const SearchLabel = styled.label`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #343434;
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
