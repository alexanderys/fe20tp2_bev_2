import Signup from "./Signup";
import Profile from "./Profile";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import Navigation from "./Navigation";
import MovieList from "./MovieList";
import Settings from "./Settings";

import { Watchlist } from "./WatchlistFolder/Watchlist";
import { Watched } from "./WatchlistFolder/Watched";
import Search from "./Search";
import Stats from "./Stats";

import * as ROUTES from "../constants/routes";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navigation />
        {/* <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="w-100" style={{ maxWidth: "1000px" }}> */}
        <Switch>
          <Route exact path="/" component={MovieList} />
          <Route path="/home" component={MovieList} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path={ROUTES.FORGOT_PASSWORD} component={ForgotPassword} />
          <Route path={ROUTES.SEARCH} component={Search} />
          <PrivateRoute path={ROUTES.PROFILE} component={Profile} />
          <PrivateRoute path={ROUTES.SETTINGS} component={Settings} />
          <PrivateRoute path={ROUTES.WATCHED} component={Watched} />
          <PrivateRoute path={ROUTES.WATCHLIST} component={Watchlist} />
          <PrivateRoute path={ROUTES.STATS} component={Stats} />
          <PrivateRoute
            path={ROUTES.UPDATE_PROFILE}
            component={UpdateProfile}
          />
          {/* <Route path={ROUTES.SETTINGS} component={Settings} /> */}
          {/* <Route path={ROUTES.HOME} component={MovieList} /> */}
          {/* <Route path={ROUTES.PROFILE} component={ProfilePage} /> */}
        </Switch>
        {/* </div>
        </Container> */}
      </AuthProvider>
    </Router>
  );
}

export default App;
