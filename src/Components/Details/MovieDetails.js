import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IMAGE_URL } from "../../constants/urlParts";
import FallbackImage from "../FallbackImage";
import { GoBackButton, DetailsCard } from "../StyledComponents";
import { useHistory } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


function MovieDetails(props) {
  const [details, setDetails] = useState({});
  const history = useHistory();

  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=f98f97b2689a1d60f3c3e51a6f703ad7`)
      .then((res) => {
        setDetails(res.data);
      });
  }, []);

  const { genres, overview, poster_path, release_date, title, vote_average } = details;

  return (
    <>
      <GoBackButton
        onClick={() => history.goBack()}
        className="fas fa-angle-left"
      ></GoBackButton>

      <DetailsCard>
        {poster_path ? (
          <img src={IMAGE_URL + poster_path} alt="" />
        ) : (
          <FallbackImage type={"movie"} />
        )}
        <h2>{title} ({release_date ? release_date.substring(0, 4) : ""})</h2>
        <span>
          <FontAwesomeIcon icon={faStar} size="1x" color="grey" />
          {vote_average}
        </span>

        {genres && (
          <ul>
            {genres.map((genre) => {
              console.log('hello')
              return <li>{genre.name}, </li>
            })}
          </ul>
        )}

        <p>{overview}</p>
      </DetailsCard>
    </>
  );
}

export default MovieDetails;
