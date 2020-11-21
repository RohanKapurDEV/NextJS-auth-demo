import React, { useState, useEffect, useContext, createContext } from "react";
import nookies from "nookies";
import { firebaseClient } from "../utils/firebaseClient";
import firebase from "firebase/app";
import "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  firebaseClient();

  const [currentUser, setCurrentUser] = useState(null);

  // Triggers when App is started
  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async (user) => {
      console.log("ID Token change detected. Proceeding accordingly...");
      // Triggers when user signs out
      if (!user) {
        setCurrentUser(null);
        nookies.set(undefined, "token", "", {});
        return;
      }

      // Triggers when user signs in or when id token refreshes (apparently once every hour in firebase)
      const token = await user.getIdToken();
      setCurrentUser(user);
      nookies.set(undefined, "token", token, {});
    });
  }, []);

  function signup(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  function loginGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async (res) => {
        console.log(await res.user.getIdTokenResult());
        console.log(res.credential.signInMethod);
        console.log(res.user.email);
        console.log(res.user.displayName);
      });
  }

  function loginGithub() {
    const provider = new firebase.auth.GithubAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async (res) => {
        console.log(await res.user.getIdTokenResult());
        console.log(res.credential.signInMethod);
        console.log(res.user.email);
        console.log(res.user.displayName);
      });
  }

  function logout() {
    return firebase.auth().signOut();
  }

  function resetPassword(email) {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return firebase.currentUser().updateEmail(email);
  }

  function updatePassword(password) {
    return firebase.currentUser().updatePassword(password);
  }

  const authObject = {
    currentUser,
    login,
    loginGoogle,
    loginGithub,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return <AuthContext.Provider value={{ authObject }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
