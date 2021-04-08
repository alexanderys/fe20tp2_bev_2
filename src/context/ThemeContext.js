import React, { createContext, useContext, useState } from 'react';

/* ==============================
Defining the 2 contexts we need. 
=================================
*/
//The actual theme
const ThemeContext = createContext();
//Roggling the theme
const ThemeUpdateContext = createContext();

/* ==============================
Making our own custom hooks to make it easy to access 
the theme + theme toggler anywhere in the app
=================================
*/
export const useTheme = () => {
    return useContext(ThemeContext);
}

export const useThemeUpdate = () => {
    return useContext(ThemeUpdateContext);
}

export default function ThemeContextProvider({ children }) {
    const [theme, setTheme] = useState('dark');

    const themeToggler = () => {
        theme === 'dark' ? setTheme('light') : setTheme('dark');
    }

    return (
        <ThemeContext.Provider value={theme}>
            <ThemeUpdateContext.Provider value={themeToggler}>
                {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    )
}