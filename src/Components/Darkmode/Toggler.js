import React from 'react';
import { func, string } from 'prop-types';
import styled from 'styled-components';
import { useDarkMode } from '../Darkmode/useDarkMode';

const Button = styled.button`
  /* background: ${({ theme }) => theme.background};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  color: ${({ theme }) => theme.text};
  border-radius: 30px;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0.6rem; */

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
  color: blue;
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
