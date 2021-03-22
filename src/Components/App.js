import Signup from "./Signup";
import Profile from "./Profile";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import Navigation from "./Navigation";
import MovieList from "./MovieList";

import { Watchlist } from "./WatchlistFolder/Watchlist";
import { Watched } from "./WatchlistFolder/Watched";
import Search from "./Search2";
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
          <PrivateRoute path={ROUTES.PROFILE} component={Profile} />
          <PrivateRoute path="/update-profile" component={UpdateProfile} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path={ROUTES.WATCHED} component={Watched} />
          <Route path={ROUTES.WATCHLIST} component={Watchlist} />
          <Route path={ROUTES.SEARCH} component={Search} />
          <Route path={ROUTES.STATS} component={Stats} />
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
