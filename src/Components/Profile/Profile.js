import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { db } from "../../firebase";

export default function Profile() {
  const { currentUser } = useAuth();

  return (
    <>
      <h1>Profile</h1>
      <section>
        <strong>Profile account:</strong> {currentUser.email}
        <hr />
        <strong>UID: </strong> {currentUser.uid}
        <hr />
        <li>
          <Link to="/watchlist">Watchlist</Link>
        </li>
        <li>
          <Link to="/watched">Have watched</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </section>
    </>
  );
}
