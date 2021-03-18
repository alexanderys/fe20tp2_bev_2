import React from 'react';
import { withFirebase } from '../Firebase';
import { useHistory } from 'react-router-dom';

const SignOutButton = ({ firebase }) => {
  let history = useHistory();

  //testa släng in i firebase dosignin

  function handleLogOut() {
    sessionStorage.setItem('userToken', '');
    sessionStorage.clear();
    history.push('/signin');
  }

  return (
    <button
      type='button'
      onClick={() => {
        firebase.doSignOut();
        handleLogOut();
      }}
    >
      Sign Out
    </button>
  );
};
export default withFirebase(SignOutButton);
