import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db, auth } from '../../firebase';
export const useDarkMode = () => {
  const { changeTheme } = useAuth();
  // const [theme, setTheme] = useState('dark');
  const [theme, setTheme] = useState('dark');

  const themeToggler = () => {
    theme !== 'dark' ? setTheme('dark') : setTheme('light');
  };

  useEffect(async () => {
    const docRef = db.collection('users').doc(auth.currentUser.uid);

    const themeData = await docRef
      .get()
      .then(async (doc) => {
        if (doc.exists) {
          changeTheme(await doc.data().theme);
        } else {
          console.log('No such data!');
        }
      })
      .catch((error) => {
        console.log('Error getting data:', error);
      });
  }, []);
  // this useffect

  // useEffect(() => {
  //   db.collection('users')
  //     .doc(auth.currentUser.uid)
  //     .collection('theme')
  //     .get()
  //     //this is async, so it returns a promise
  //     .then(async (doc) => {
  //       if (doc.exists) {
  //         await setTheme(doc.data().theme);
  //       } else {
  //         // doc.data() will be undefined in this case
  //         console.log('No such document!');
  //       }
  //     })
  //     .catch((error) => {
  //       console.log('Error getting document:', error);
  //     });
  // }, []);

  return [theme, themeToggler];
};
