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

    const themeData = await docRef
      .get()
      .then(async (doc) => {
        if (doc.exists) {
          changeTheme(await doc.data().theme);
        } else {
          console.log("No such data!");
        }
      })
      .catch((error) => {
        console.log("Error getting data:", error);
      });
  }, []);
  return [theme, themeToggler];
};
