import PrivateRoute from "./PrivateRoute";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Signup from "./Signup";
import { AuthProvider } from "../context/AuthContext";
import Dashboard from "./Dashboard";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";

const Navigation = () => (
  <Router>
    <Switch>
      <PrivateRoute exact path="/" component={Dashboard} />
      <PrivateRoute path="/update-profile" component={UpdateProfile} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/forgot-password" component={ForgotPassword} />
    </Switch>
  </Router>
);

export default Navigation;
