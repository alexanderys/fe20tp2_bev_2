import React, { useState, useEffect } from 'react';
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";

export const Watchlist = () => {
  const { currentUser } = useAuth();
  const [moviesInWatchlist, setMoviesInWatchlist] = useState([]);

  useEffect(() => {
    db.collection("users")
      .doc(currentUser.uid)
      .collection("watchlist")
      .get()
      //this is async, so it returns a promise
      .then((snapshot) => {
        let documents = [];
        snapshot.docs.forEach((doc) => {
          documents.push(doc.data().movieTitle);
        });
        setMoviesInWatchlist(documents);
      });
  }, []);

  console.log(moviesInWatchlist);

  return (<>

    <div className="header">
      <h1>My Watchlist</h1>
      <strong>User email: </strong> {currentUser.email}
      <br />
      <strong>UID: </strong>{currentUser.uid}
      <hr /> <br />

      <h3 className="count-pill">
        {'You have ' + moviesInWatchlist.length + ' '}
        {moviesInWatchlist.length === 1 ? "movie" : "movies"}
        {' in your watchlist'}
      </h3>
    </div>

    <br />

    {moviesInWatchlist.length > 0 ? (
      <>
        {/* Temporary simple display of movies 
            There's not MovieItem here so no buttons for Removing n stuff
        */}
        <hr />
        <h2>{moviesInWatchlist}</h2>
      </>
    ) : (
      <h2>No movies in your watchlist! Add some!</h2>
    )}

  </>);
};
