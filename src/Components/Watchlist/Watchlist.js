import React, { useContext } from "react";
import MovieItem from "../Search/MovieItem";
import { ResultsGrid } from "../StyledComponents";

export const Watchlist = () => {
  const IMAGE_URL = "https://image.tmdb.org/t/p/w1280";

  return (
    <div>
      <div className="header">
        <h1>My Watchlist</h1>
        <h3 className="count-pill"></h3>
      </div>
    </div>
  );
};
