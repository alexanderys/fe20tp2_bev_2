import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import ProfilePage from '../Profile';
import AdminPage from '../Admin';
import Settings from '../Settings';
import Search from '../Search';
import Stats from '../Stats';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';


const App = () => (
  <Router>
    <div>
      <Navigation />
      <hr />
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
);

export default withAuthentication(App);
