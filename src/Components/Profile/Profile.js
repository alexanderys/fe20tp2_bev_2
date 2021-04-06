import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

export const ProfilePage = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 2rem;
    text-align: center;
    margin: 100px 0;
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
    color: black;
    text-decoration: none;
    border-bottom: 2px solid black;
    padding-bottom: 5px;
  }
`;

export default function Profile() {
  const { currentUser } = useAuth();
  const history = useHistory();

  return (
    <>
      <ProfilePage>
        <h1>Profile</h1>

        <li>
          <Link to="/settings">
            Settings <i className="fas fa-cog"></i>
          </Link>
        </li>
        <li>
          <Link to="/watchlist">
            Watchlist <i className="fas fa-angle-right"></i>
          </Link>
        </li>
        <li>
          <Link to="/watched">
            Have watched <i className="fas fa-angle-right"></i>
          </Link>
        </li>
      </ProfilePage>
    </>
  );
}
