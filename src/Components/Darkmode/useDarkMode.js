import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { db, auth } from "../../firebase";
export const useDarkMode = () => {
  const { changeTheme } = useAuth();
  const [theme] = useState("dark");

  const themeToggler = () => {
    theme !== "dark" ? changeTheme("dark") : changeTheme("light");
  };

  useEffect(async () => {
    const docRef = db.collection("users").doc(auth.currentUser.uid);

  }, []);
  return [theme, themeToggler];
};
