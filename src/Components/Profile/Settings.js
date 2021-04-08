import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
//Importing our custom theme toggle hook
import { useThemeUpdate, useTheme } from '../../context/ThemeContext';

import {
  SecondarySection,
  PrimaryButton,
  GoBackButton,
} from "../StyledComponents";

export default function Settings() {
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const history = useHistory();

  ////Importing our custom theme toggle hook pt. 2
  const themeToggler = useThemeUpdate();
  const theme = useTheme();

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
      <SecondarySection>
        <GoBackButton
          onClick={() => history.goBack()}
          className="fas fa-angle-left"
        ></GoBackButton>

        <h1>Settings</h1>

        <li>
          <Link to="/update-profile">
            Update password or email <i className="fas fa-angle-right"></i>
          </Link>
        </li>

        {/* ============
        Theme stuff START
        ===============*/}

        <button onClick={themeToggler}>themeToggler</button>
        <div>{theme}</div>

        {/* ============
        Theme stuff END
        ===============*/}

        {error && <div>{error}</div>}
        <PrimaryButton onClick={handleLogout}>
          Log Out
        </PrimaryButton>

      </SecondarySection>
    </>
  );
}
