import React, { useContext } from 'react';
import Settings from '../Settings';

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization } from '../Session';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const ProfilePage = () => {
  const { email } = useContext(AuthUserContext);

  return (
    <Switch>
      <Route path='/settings'>
        <Settings />
      </Route>
      <Route path='/profile'>
        <Link to={ROUTES.SETTINGS}>Settings</Link>
        <div>
          <h1>Profile: {email}</h1>
          {/* <PasswordForgetForm /> */}
        </div>
        <PasswordChangeForm />
      </Route>
    </Switch>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(ProfilePage);
