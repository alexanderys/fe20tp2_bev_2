import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { IMAGE_URL } from "../../constants/urlParts";
import FallbackImage from "../FallbackImage";
import { GoBackButton, DetailsCard } from "../StyledComponents";

function ActorDetails() {
  const [details, setDetails] = useState({});
  const history = useHistory();

  let { id } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/person/${id}?api_key=f98f97b2689a1d60f3c3e51a6f703ad7`
      )
      .then((res) => {
        setDetails(res.data);
      });
  }, []);

  const { birthday, deathday, name, biography, profile_path } = details;

  return (
    <>
      <GoBackButton
        onClick={() => history.goBack()}
        className="fas fa-angle-left"
      ></GoBackButton>

      <DetailsCard>
        {profile_path ? (
          <img src={IMAGE_URL + profile_path} alt="" />
        ) : (
          <FallbackImage type={"actor"} />
        )}
        <h2>{name}</h2>
        <span>Born: {birthday}</span>
        <span>{deathday ? "Died: " + deathday : ""}</span>

        <p>{biography}</p>
      </DetailsCard>
    </>
  );
}

export default ActorDetails;
