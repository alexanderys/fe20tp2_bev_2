import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Watchlist } from "../WatchlistFolder/Watchlist";
import { Watched } from "../WatchlistFolder/Watched";
import { Add } from "../WatchlistFolder/Add";
import Navigation from "../Navigation";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import ProfilePage from "../Profile";
import AdminPage from "../Admin";
import Settings from "../Settings";
import Search from "../Search";
import Stats from "../Stats";

import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session";
import { GlobalProvider } from "../../context/GlobalState";

const App = () => (
  <GlobalProvider>
    <Router>
      <div>
        <Navigation />
        <hr />
        {/* <Route path="/watched">
          <Watched />
        </Route>
        <Route path="/watchlist">
          <Watchlist />
        </Route> */}
        <Route path={ROUTES.ADD} component={Add} />
        <Route path={ROUTES.WATCHED} component={Watched} />
        <Route path={ROUTES.WATCHLIST} component={Watchlist} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.PROFILE} component={ProfilePage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
        <Route path={ROUTES.SETTINGS} component={Settings} />
        <Route path={ROUTES.SEARCH} component={Search} />
        <Route path={ROUTES.STATS} component={Stats} />
      </div>
    </Router>
  </GlobalProvider>
);

export default withAuthentication(App);
