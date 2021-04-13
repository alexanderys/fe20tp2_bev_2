import React, { useContext, useState, useEffect, createContext } from 'react';
import { auth, db } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children, onChange, currentTheme }) {
  const [theme, setTheme] = useState(currentTheme);

  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function signup(email, password) {
    const res = await auth.createUserWithEmailAndPassword(email, password);

    db.collection(`users`)
      .doc(res.user.uid)
      .set({
        theme: 'dark',
      })
      .then(() => {
        console.log('Theme Added!');
      })
      .catch((error) => {
        console.error('Error updating Theme: ', error);
      });
    return res;
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  //------------------------Theme Stuff-------------------------------//

  // This function search for theme-value inside firestore user collection that has the matching user id, and return it back
  async function readTheme() {
    const docRef = db.collection('users').doc(auth.currentUser.uid);

    const themeData = await docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data().theme;
        } else {
          console.log('No such data!');
        }
      })
      .catch((error) => {
        console.log('Error getting data:', error);
      });

    return themeData;
  }

  // Function for updating the theme-state in App-component
  async function changeTheme(newTheme) {
    onChange(newTheme);
    localStorage.setItem('theme', await newTheme);
  }

  // This function serch for the current user in firestore and update the theme-value Ex. 'dark' | 'light'
  //FIX BUG
  // works ok, needs modification. gets stuck when switch to fast.

  async function updateTheme(curTheme) {
    try {
      db.collection('users')
        .doc(auth.currentUser.uid)
        .update({
          theme: `${(await curTheme) !== 'dark' ? 'dark' : 'light'}`,
        });
      changeTheme(await readTheme().then((data) => data));
      localStorage.setItem('theme', await readTheme().then((data) => data));
    } catch (error) {
      console.log('SomeError accured: ', error);
    }
  }
  useEffect(async () => {
    changeTheme(await localStorage.getItem('theme'));
  }, [updateTheme]);

  //----------------------------------------------------------//

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
      //as soon as we have a user, setLoading changes to false
    });

    return unsubscribe;
    //unsubscribe will unsubscribe us from the onAuthState-listener when it's unmounted
  }, []);
  // [] = only run once

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    readTheme,
    updateTheme,
    theme,
    setTheme,
    changeTheme,
    currentTheme,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
      {/* if we're not loading, we'll render out the children */}
    </AuthContext.Provider>
  );
}
