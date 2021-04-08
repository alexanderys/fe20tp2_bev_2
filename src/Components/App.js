import Signup from './Authentication/Signup';
import Login from './Authentication/Login';
import ForgotPassword from './Authentication/ForgotPassword';
import Profile from './Profile/Profile';
import UpdateProfile from './Profile/UpdateProfile';
import Settings from './Profile/Settings';
import Watchlist from './Watchlist/Watchlist';
import Watched from './Watchlist/Watched';
import PrivateRoute from './PrivateRoute';
import Navigation from './Navigation';
import Home from './Home';
import Search from './Search/Search';
import Stats from './Stats';
import * as ROUTES from '../constants/routes';
import { AuthProvider } from '../context/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './Darkmode/Themes';
import { GlobalStyles } from './Darkmode/GlobalStyles';
import React, { useState } from 'react';

function App() {
  const [theme, setTheme] = useState('light');
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  return (
    <Router>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <>
          <GlobalStyles />
          <button onClick={themeToggler}>Switch Theme</button>
          <AuthProvider>
            <Navigation />
            <Switch>
              <Route exact path='/' component={Home} />
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
          </AuthProvider>
        </>
      </ThemeProvider>
    </Router>
  );
}

export default App;
