import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IMAGE_URL } from "../constants/urlParts";
import FallbackImage from "./FallbackImage";
import { GoBackButton, ItemCard } from "./StyledComponents";
import { useHistory } from "react-router-dom";
import MovieItem from './Search/MovieItem';
import TvItem from './Search/TvItem';

function MovieDetailsPage(props) {
  const [details, setDetails] = useState({});
  const [mediaType, setMediaType] = useState('');
  const history = useHistory();

  let { id } = useParams();
  console.log(id);

  let urlPath = props.location.pathname;
  console.log(urlPath);

  useEffect(() => {
    if (urlPath.includes('movie')) {
      axios
        .get(`https://api.themoviedb.org/3/movie/${id}?api_key=f98f97b2689a1d60f3c3e51a6f703ad7`)
        .then((res) => {
          setDetails(res.data);
          setMediaType('movie');
        });
    } else if (urlPath.includes('tv')) {
      axios
        .get(`https://api.themoviedb.org/3/tv/${id}?api_key=f98f97b2689a1d60f3c3e51a6f703ad7`)
        .then((res) => {
          setDetails(res.data);
          setMediaType('tv');
        });
    }
  }, []);

  return (
    <ItemCard style={{
      maxWidth: "100%",
      maxHeight: "100%"
    }}>
      <GoBackButton
        onClick={() => history.goBack()}
        className="fas fa-angle-left"
      ></GoBackButton>
      {/*       <div>
        {mediaType === 'movie' ? (

        ): (

          )}
      </div> */}
    </ItemCard>
  );
}

export default MovieDetailsPage;
