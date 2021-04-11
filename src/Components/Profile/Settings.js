import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { db, auth } from '../../firebase';
import { lightTheme, darkTheme } from '../Darkmode/Themes';
import {
  SecondarySection,
  PrimaryButton,
  GoBackButton,
} from '../StyledComponents';
import { useDarkMode } from '../Darkmode/useDarkMode';
import Toggler from '../Darkmode/Toggler';

export default function Dashboard() {
  const [theme, themeToggler] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  const [error, setError] = useState('');
  const { logout, readTheme, updateTheme } = useAuth();
  const history = useHistory();

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
          <Toggler theme={theme} toggleTheme={themeToggler} />
          {/* <button
            onClick={(e) => {
              console.log('btn clicked');
              readTheme().then((data) => (data = !'dark' ? 'dark' : 'light'));
            }}
          >
            Toggle Theme
          </button> */}
        </li>
        <button onClick={console.log(useDarkMode())}>test</button>
        {error && <div>{error}</div>}
        <PrimaryButton onClick={handleLogout}>Log Out</PrimaryButton>
      </SecondarySection>
    </>
  );
}
