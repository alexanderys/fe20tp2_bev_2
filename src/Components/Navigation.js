import * as ROUTES from "../constants/routes";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faHome,
  faChartPie,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const StyledNav = styled.nav`
  ul {
    z-index: 10;
    padding: 10px;
    overflow: hidden;
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    background-color: black;
  }
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

  @media (min-width: 500px) {
    ul {
      top: 0;
      bottom: auto;
    }
  }
`;

const Navigation = () => {
  const { currentUser } = useAuth();

  return (
    <StyledNav>
      <ul>
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
          {currentUser ? (
            <Link to={ROUTES.PROFILE}>
              <FontAwesomeIcon icon={faUser} />
              <p>Profile</p>
            </Link>
          ) : (
            <Link to={ROUTES.LOG_IN}>
              <FontAwesomeIcon icon={faUser} />
              <p>Log In</p>
            </Link>
          )}
        </li>
      </ul>
    </StyledNav>
  );
};

export default Navigation;
