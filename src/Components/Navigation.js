import * as ROUTES from "../constants/routes";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledUL = styled.ul`
  padding: 10px;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: black;

  li {
    list-style: none;
    margin: 5px 10px;
    padding: 5px;
    font-size: 1.2rem;
  }

  li a {
    text-decoration: none;
    color: white;
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
