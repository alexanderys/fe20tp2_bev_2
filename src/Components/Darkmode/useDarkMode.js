import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
export const useDarkMode = () => {
  const { theme, setTheme } = useAuth();
  const setMode = (mode) => {
    window.localStorage.setItem('theme', mode);

    setTheme(mode);
  };

  const themeToggler = () => {
    theme === 'light' ? setMode('dark') : setMode('light');
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    localTheme && setTheme(localTheme);
  }, []);
  return [theme, themeToggler];
};
