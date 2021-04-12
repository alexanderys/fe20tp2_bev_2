import React, { useContext, useState, useEffect, createContext } from 'react';
import { auth, db } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children, onChange }) {
  const [theme, setTheme] = useState('dark');

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

  // This function serch for theme value inside firestore and return it back
  async function readTheme() {
    var docRef = db.collection('users').doc(auth.currentUser.uid);

    let themeData = await docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          onChange(doc.data().theme);
          return doc.data().theme;
        } else {
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });

    return themeData;
  }

  // This function serch for the current user in firestore and update the theme status Ex. 'dark' | 'light'
  async function updateTheme(curTheme) {
    console.log(await curTheme);
    db.collection('users')
      .doc(auth.currentUser.uid)
      .update({
        theme: `${(await curTheme) !== 'dark' ? 'dark' : 'light'}`,
      });
    onChange(await curTheme);
  }

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
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
      {/* if we're not loading, we'll render out the children */}
    </AuthContext.Provider>
  );
}
