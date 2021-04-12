import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { db, auth } from '../../firebase';
import { lightTheme, darkTheme } from '../Darkmode/Themes';
import {
  ThemeProvider,
  SecondarySection,
  PrimaryButton,
  GoBackButton,
} from '../StyledComponents';
import { useDarkMode } from '../Darkmode/useDarkMode';
import Toggler from '../Darkmode/Toggler';

export default function Dashboard({ test }) {
  const [theme, themeToggler] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  const [error, setError] = useState('');
  const { logout, readTheme, updateTheme } = useAuth();
  const history = useHistory();

  function updateMyTheme() {
    test(readTheme().then((data) => data));
    // updateTheme(readTheme().then((data) => data));
  }

  async function handleLogout() {
    setError('');

    try {
      await logout();
      history.push('/');
    } catch {
      setError('Failed to log out');
    }
  }

  return (
    <>
      <SecondarySection>
        <GoBackButton
          onClick={() => history.goBack()}
          className='fas fa-angle-left'
        ></GoBackButton>

        <h1>Settings</h1>

        <li>
          <Link to='/update-profile'>
            Update password or email <i className='fas fa-angle-right'></i>
          </Link>
        </li>

        <li>
          <p>Uppdate Your theme</p>
          {/* <UseDarkMode /> */}
          <Toggler theme={`${theme}`} toggleTheme={themeToggler} />
          <button
            onClick={(e) => {
              console.log('btn clicked');
              updateTheme(readTheme().then((data) => data));
            }}
          >
            Toggle Theme
          </button>
          {/* <button
            onClick={(e) => {
              console.log('btn clicked');
              readTheme().then(
                (data) =>
                  (data = !'dark' ? console.log('dark') : console.log('light'))
              );
            }}
          >
            Toggle Theme
          </button> */}
        </li>

        {error && <div>{error}</div>}
        <PrimaryButton onClick={handleLogout}>Log Out</PrimaryButton>
      </SecondarySection>
    </>
  );
}
