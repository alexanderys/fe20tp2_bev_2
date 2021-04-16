import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { lightTheme, darkTheme } from '../Darkmode/Themes';
import {
  SecondarySection,
  PrimaryButton,
  GoBackButton,
  ButtonContainer
} from '../StyledComponents';
import { useDarkMode } from '../Darkmode/useDarkMode';
import Toggler from '../Darkmode/Toggler';

export default function Dashboard() {
  const [theme, themeToggler] = useDarkMode();
  const [error, setError] = useState('');
  const { logout, readTheme, updateTheme } = useAuth();
  const history = useHistory();

  function updateMyTheme() {
    updateTheme(readTheme().then((data) => data));
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
          {/* @TODO: conditional text rendering 
              according to theme,
              i.e.  darktheme: switch to light, 
                    lighteme: switch to dark
          */}
          <p>Update your theme</p>

          {/* <UseDarkMode /> */}
          <Toggler theme={`${themeToggler}`} toggleTheme={updateMyTheme} />
        </li>

        {error && <div>{error}</div>}
        <ButtonContainer>
          <PrimaryButton onClick={() => alert("vi vill inte prata med dig!")}>Contact Admins</PrimaryButton>
          <PrimaryButton onClick={handleLogout}>Log Out</PrimaryButton>
        </ButtonContainer>
      </SecondarySection>
    </>
  );
}
