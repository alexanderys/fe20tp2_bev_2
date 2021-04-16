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
import { AuthProvider, useAuth } from '../context/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MovieDetails from "./Details/MovieDetails";
import TvDetails from "./Details/TvDetails";
import ActorDetails from "./Details/ActorDetails";
//Theme stuff
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './Darkmode/Themes';
import React, { useState, useEffect } from 'react';
import { GlobalStyles } from './StyledComponents';

// Global font
import GlobalFonts from '../style/fonts/fonts';
import { db, auth } from '../firebase';
import { useDarkMode } from './Darkmode/useDarkMode';

function App() {
  //Theme stuff
  /* ========================================================= */
  const [theme, setTheme] = useState('dark');
  //  Create a function that changes the theme-state in App-component
  //  so you can pass it forward to a child component.
  function handleChange(newTheme) {
    setTheme(newTheme);
  }
  //checks value for theme in local storage, to asisst the glitch, But its not working as it should, yet.
  if (theme !== localStorage.getItem('theme')) {
    setTheme(localStorage.getItem('theme'));
  }

  /* ========================================================= */
  return (
    <Router>
      {/* passing props to the AuthProvider*/}
      <AuthProvider value={theme} onChange={handleChange} currentTheme={theme}>
        <Navigation />

        {/* Theme stuff */}
        {/* =========================================================  */}
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
          <GlobalFonts />
          <GlobalStyles theme={theme === 'light' ? lightTheme : darkTheme} />
          {/*  ========================================================= */}

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
            <PrivateRoute path={`${ROUTES.MOVIE}/:id`} component={MovieDetails} />
            <PrivateRoute path={`${ROUTES.TV}/:id`} component={TvDetails} />
            <PrivateRoute path={`${ROUTES.ACTOR}/:id`} component={ActorDetails} />
          </Switch>
        </ThemeProvider>
      </AuthProvider>
    </Router >
  );
}

export default App;
