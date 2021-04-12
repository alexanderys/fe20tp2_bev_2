import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db, auth } from '../../firebase';
export const useDarkMode = () => {
  const { theme, setTheme } = useAuth();

  //PROBLEM: Cant get theme value

  const themeToggler = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark');
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    localTheme && setTheme(localTheme);
    console.log('from UseEffect!', localTheme);
  }, []);
  // this useffect

  useEffect(() => {
    // db.collection('users')
    //   .doc(auth.currentUser.uid)
    //   .collection('theme')
    //   .get()
    //   //this is async, so it returns a promise
    //   .then(async (doc) => {
    //     if (doc.exists) {
    //       await setTheme(doc.data().theme);
    //     } else {
    //       // doc.data() will be undefined in this case
    //       console.log('No such document!');
    //     }
    //   })
    //   .catch((error) => {
    //     console.log('Error getting document:', error);
    //   });
  }, []);

  return [theme, themeToggler];
};
