import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

export const SettingsPage = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  .back-icon {
    align-self: flex-start;
    margin-top: 30px;
    margin-left: 30px;
    font-size: 1.5rem;
    cursor: pointer;
  }
  h1 {
    font-size: 2rem;
    text-align: center;
    margin: 50px 0;
  }

  li {
    list-style: none;
    font-size: 1.3rem;
    font-weight: 600;
    margin-top: 100px;
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

  button {
    width: 80vw;
    font-family: inherit;
    font-size: 1.1rem;
    background: none;
    border: 2px solid black;
    padding: 10px 30px;
    margin-top: 40vh;
  }
`;

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <SettingsPage>
        <i
          onClick={() => history.goBack()}
          className="back-icon fas fa-angle-left"
        ></i>
        <h1>Settings</h1>
        <li>
          <Link to="/update-profile">
            Update password or email <i className="fas fa-angle-right"></i>
          </Link>
        </li>
        <button variant="link" onClick={handleLogout}>
          Log Out
        </button>
      </SettingsPage>
    </>
  );
}
