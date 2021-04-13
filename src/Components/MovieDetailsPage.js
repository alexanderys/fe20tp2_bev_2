import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IMAGE_URL } from "../constants/urlParts";
import { ItemCard } from "./StyledComponents";
import FallbackImage from "./FallbackImage";

function MovieDetailsPage(props) {
  const [details, setDetails] = useState({});

  let id = props.match.params.id;
  console.log(id);

  let urlPath = props.location.pathname;
  console.log(urlPath)

  useEffect(() => {
    if (urlPath.includes('movie')) {
      axios
        .get(`https://api.themoviedb.org/3/movie/${id}?api_key=f98f97b2689a1d60f3c3e51a6f703ad7`)
        .then((res) => {
          setDetails(res.data);
        });
    } else if (urlPath.includes('tv')) {
      axios
        .get(`https://api.themoviedb.org/3/tv/${id}?api_key=f98f97b2689a1d60f3c3e51a6f703ad7`)
        .then((res) => {
          setDetails(res.data);
        });
    }
  }, []);

  return (
    <div>
      <p>{details.title}</p>
    </div>
  );
}

export default MovieDetailsPage;
