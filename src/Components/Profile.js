import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Card, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

export default function You() {
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
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          <strong>Profile account:</strong> {currentUser.email}
          <Link to="/watchlist" className="btn btn-primary w-100 mt-3">
            Watchlist
          </Link>
          <Link to="/watched" className="btn btn-primary w-100 mt-3">
            Have watched
          </Link>
          <Link to="/settings" className="btn btn-secondary w-100 mt-3">
            Settings
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}
