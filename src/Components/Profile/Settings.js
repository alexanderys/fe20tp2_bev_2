import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { useTheme, useThemeUpdate } from '../../context/ThemeContext';
import { db } from "../../firebase";

import {
  SecondarySection,
  PrimaryButton,
  GoBackButton,
} from "../StyledComponents";

export default function Settings() {
  const [error, setError] = useState("");
  const { logout, currentUser } = useAuth();
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

  /* Importing the theme toggle function from ThemeContext.js */
  const toggleTheme = useThemeUpdate();
  /* Importing the theme state from ThemeContext.js */
  const theme = useTheme();

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

        {/* 
INFO!!!!!!!!!!!

ATM I'm just setting the theme state to the db, not changing the theme state
on click. Wasn't able to figure out how to do both things when clicking the 
Change Theme button.
*/}

        <button onClick={
          () => {
            db.collection("users")
              .doc(currentUser.uid)
              .collection("karl-theme")
              .doc(/* id.toString() */)
              .set({
                karlTheme: theme
              });
          }

        }>Change Theme</button>

        <div>{theme}</div>

        {error && <div>{error}</div>}
        <PrimaryButton onClick={handleLogout}>
          Log Out
        </PrimaryButton>

      </SecondarySection>
    </>
  );
}
