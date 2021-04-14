import React, { createContext, useContext, useState } from 'react';

/* ==============================
Defining the 2 contexts we need. 
=================================
*/
//The actual theme
const ThemeContextWDS = createContext();
//Toggling the theme
const ThemeUpdateContextWDS = createContext();

/* ==============================
Making our own custom hooks to make it easy to access 
the theme + theme toggler anywhere in the app
=================================
*/
export const useTheme = () => {
    return useContext(ThemeContextWDS);
}

export const useThemeUpdate = () => {
    return useContext(ThemeUpdateContextWDS);
}

export default function ThemeContextProviderWDS({ children }) {
    const [theme, setTheme] = useState('dark');

    const themeToggler = () => {
        theme === 'dark' ? setTheme('light') : setTheme('dark');
        console.log(theme);
    }

    return (
        <ThemeContextWDS.Provider value={theme}>
            <ThemeUpdateContextWDS.Provider value={themeToggler}>
                {children}
            </ThemeUpdateContextWDS.Provider>
        </ThemeContextWDS.Provider>
    )
}