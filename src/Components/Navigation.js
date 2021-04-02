import * as ROUTES from "../constants/routes";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledUL = styled.ul`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background-color: beige;
  bottom: 0;

  li {
    list-style: none;
    margin: 5px 10px;
    padding: 5px;
    font-size: 1.2rem;
  }

  li a {
    text-decoration: none;
    color: black;
  }

  li:hover a {
    text-decoration: underline;
  }
`;

const Navigation = () => (
  <StyledUL>
    <li>
      <Link to={ROUTES.SEARCH}>Search</Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.STATS}>Stats</Link>
    </li>
    <li>
      <Link to={ROUTES.PROFILE}>Profile</Link>
    </li>
  </StyledUL>
);

export default Navigation;
