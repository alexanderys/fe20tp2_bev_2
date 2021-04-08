import Signup from "./Authentication/Signup";
import Login from "./Authentication/Login";
import ForgotPassword from "./Authentication/ForgotPassword";
import Profile from "./Profile/Profile";
import UpdateProfile from "./Profile/UpdateProfile";
import Settings from "./Profile/Settings";
import Watchlist from "./Watchlist/Watchlist";
import Watched from "./Watchlist/Watched";
import PrivateRoute from "./PrivateRoute";
import Navigation from "./Navigation";
import Home from "./Home";
import Search from "./Search/Search";
import Stats from "./Stats";
import * as ROUTES from "../constants/routes";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//Theme stuff v1
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, GlobalStyles } from './Themes/Themes';
import { useState } from 'react';

//Theme stuff v2
//import ThemeContextProvider from '../context/ThemeContext';

function App() {

  //Theme stuff. Move this to a ThemeContext.js file later
  const [theme, setTheme] = useState("dark");

  const themeToggler = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark');
  }

  return (
    <Router>
      <AuthProvider>
        <Navigation />
        {/* Theme stuff v1 */}
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
          <GlobalStyles />
          <button onClick={() => themeToggler()}>Change Theme</button>


          {/* Theme stuff v2 */}
          {/* <ThemeContextProvider> */}

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path={ROUTES.HOME} component={Home} />
            <Route path={ROUTES.SIGN_UP} component={Signup} />
            <Route path={ROUTES.LOG_IN} component={Login} />
            <Route path={ROUTES.FORGOT_PASSWORD} component={ForgotPassword} />
            <PrivateRoute path={ROUTES.SEARCH} component={Search} />
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

        </ThemeProvider>
        {/* </ThemeContextProvider> */}
      </AuthProvider>
    </Router>
  );
}

export default App;
