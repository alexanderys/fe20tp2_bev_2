import React from "react";

import { Link, useHistory } from "react-router-dom";
import { SecondarySection, /* GoBackButton */ } from "../StyledComponents";

export default function Profile() {

  const history = useHistory();

  return (
    <>
      <SecondarySection>
        {/*  <GoBackButton
          onClick={() => history.goBack()}
          className="fas fa-angle-left"
        ></GoBackButton> */}
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


      </SecondarySection>
    </>
  );
}
