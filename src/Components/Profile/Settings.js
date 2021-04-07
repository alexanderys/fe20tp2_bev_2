import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import {
  SecondarySection,
  PrimaryButton,
  GoBackButton,
} from "../StyledComponents";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { logout } = useAuth();
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
        {error && <div>{error}</div>}
        <PrimaryButton onClick={handleLogout}>
          Log Out
        </PrimaryButton>

      </SecondarySection>
    </>
  );
}
