import Signup from "./Authentication/Signup";
import Login from "./Authentication/Login";
import ForgotPassword from "./Authentication/ForgotPassword";
import Profile from "./Profile/Profile";
import UpdateProfile from "./Profile/UpdateProfile";
import Settings from "./Profile/Settings";
import { Watchlist } from "./Watchlist/Watchlist";
import { Watched } from "./Watchlist/Watched";
import PrivateRoute from "./PrivateRoute";
import Navigation from "./Navigation";
import MovieList from "./MovieList";
import Search from "./Search";
import Stats from "./Stats";
import * as ROUTES from "../constants/routes";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navigation />
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
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
