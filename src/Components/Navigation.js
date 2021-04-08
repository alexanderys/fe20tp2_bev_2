import * as ROUTES from "../constants/routes";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faHome,
  faChartPie,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const StyledUL = styled.ul`
  padding: 10px;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  li p {
    text-align: center;
    color: white;
    margin-top: 10px;
    font-size: 14px;
  }

  li:hover a {
    text-decoration: underline;
  }
`;

const Navigation = () => (
  <nav>
    <StyledUL>
      <li>
        <Link to={ROUTES.HOME}>
          <FontAwesomeIcon icon={faHome} />
          <p>Home</p>
        </Link>
      </li>
      <li>
        <Link to={ROUTES.SEARCH}>
          <FontAwesomeIcon icon={faSearch} />
          <p>Search</p>
        </Link>
      </li>
      <li>
        <Link to={ROUTES.STATS}>
          <FontAwesomeIcon icon={faChartPie} />
          <p>Stats</p>
        </Link>
      </li>
      <li>
        <Link to={ROUTES.PROFILE}>
          <FontAwesomeIcon icon={faUser} />
          <p>Profile</p>
        </Link>
      </li>
    </StyledUL>
  </nav>
);

export default Navigation;
