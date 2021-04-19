import React from "react";
import { func, string } from "prop-types";
import styled from "styled-components";

const Button = styled.button`
  font-family: inherit;
  font-size: 1.1rem;
  background: ${({ theme }) => theme.primaryBackground};
  border: 2px solid ${({ theme }) => theme.primaryColor};
  color: ${({ theme }) => theme.primaryColor};
  padding: 10px 30px;
  cursor: pointer;
  width: 100%;
  margin: 10px 0 150px 0;

  &:focus {
    outline: none;
  }
  &:before {
    color: red;
  }
  &:after {
  }
`;
const Toggler = ({ theme, toggleTheme }) => {
  return <Button onClick={toggleTheme}>Switch Theme</Button>;
};
Toggler.propTypes = {
  theme: string.isRequired,
  toggleTheme: func.isRequired,
};
export default Toggler;
