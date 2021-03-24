import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      {" "}
      <h1>Settings</h1>
      <section>
        {error && <div variant="danger">{error}</div>}
        <strong>Account belongs to:</strong> {currentUser.email}
        <li>
          <Link to="/update-profile">Update password or email</Link>
        </li>
      </section>
      <hr />
      <div>
        <button variant="link" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </>
  );
}
