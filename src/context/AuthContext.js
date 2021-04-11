import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
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
    // console.log(test().user.uid);
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
  function updateTheme(theme) {
    console.log('Hi from updateTheme', auth.currentUser.uid);
    // Add a new document in collection "cities"
    // db.collection(`users`)
    //   .doc(auth.currentUser.uid)
    //   .set({
    //     theme: 'dark',
    //   })
    //   .then(() => {
    //     console.log('Theme Added!');
    //   })
    //   .catch((error) => {
    //     console.error('Error updating Theme: ', error);
    //   });
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
    theme,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    updateTheme,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
      {/* if we're not loading, we'll render out the children */}
    </AuthContext.Provider>
  );
}
