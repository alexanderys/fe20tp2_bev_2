import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    //the function below is async, therefore we need .then
    return auth.createUserWithEmailAndPassword(email, password);
    // .then((cred) => {
    //   console.log(cred.user.uid);
    //   return db.collection("users").doc(cred.user.uid);
    // });
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
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
      {/* if we're not loading, we'll render out the children */}
    </AuthContext.Provider>
  );
}
