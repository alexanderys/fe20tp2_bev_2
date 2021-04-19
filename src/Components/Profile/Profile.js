import React from "react";

import { Link } from "react-router-dom";
import { SecondarySection } from "../StyledComponents";

export default function Profile() {
  return (
    <>
      <SecondarySection>
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
            Have Watched <i className="fas fa-angle-right"></i>
          </Link>
        </li>
      </SecondarySection>
    </>
  );
}
