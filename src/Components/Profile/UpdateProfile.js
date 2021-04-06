import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { MainButton, MainInput, MainLabel } from "../StyledComponents";

export const UpdateProfilePage = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  .back-icon {
    align-self: flex-start;
    margin-top: 30px;
    margin-left: 30px;
    font-size: 1.5rem;
    cursor: pointer;
  }
  h1 {
    font-size: 2rem;
    text-align: center;
    margin-top: 50px;
    margin-bottom: 100px;
  }

  label {
    font-size: 1.3rem;
    font-weight: 600;
  }

  input {
    width: 80vw;
    display: block;
    border: none;
    border-bottom: 2px solid black;
    padding: 10px 1px;
    margin-bottom: 30px;
    font-size: 1.2rem;
    font-weight: 400;
  }

  input::placeholder {
    font-size: 1rem;
    font-style: italic;
    color: #a6a6a6;
  }

  input:focus {
    outline: none;
  }

  button {
    width: 80vw;
    margin-top: 100px;
    font-family: inherit;
    font-size: 1.1rem;
    background: none;
    border: 2px solid black;
    padding: 10px 30px;
  }
`;

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      //if we've changed the email, we want to add that promise to the array
      //we call the updateEmail-function with our current email, and add this to the array of promises
      //we want to do all the promises before we throw an error
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      //we pass in the array of promises,
      //when all the promises finishes and are successful, then history.push will execute
      .then(() => {
        setMessage(
          "Profile was successfully updated. Press Cancel to return to start page."
        );
        console.log("success");
      })
      //   .then(() => {
      //     history.push("/");
      //   })
      .catch(() => {
        setError("Failed to update account");
        //Probably "Credentials are too old, you need to log in again"-error?
        //https://firebase.google.com/docs/reference/js/firebase.User#reauthenticatewithcredential
      })
      //finally runs wheather we succeed or fail
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <UpdateProfilePage>
        <i
          onClick={() => history.goBack()}
          className="back-icon fas fa-angle-left"
        ></i>
        <h1>Update Profile</h1>
        {error && <div variant="danger">{error}</div>}
        {message && <div variant="success">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div id="email">
            <label>Email</label>
            <input
              type="email"
              ref={emailRef}
              required
              defaultValue={currentUser.email}
            />
          </div>
          <div id="password">
            <label>Password</label>
            <input
              type="password"
              ref={passwordRef}
              placeholder="Leave blank to keep the same"
            />
          </div>
          <div id="password-confirm">
            <label>Password Confirmation</label>
            <input
              type="password"
              ref={passwordConfirmRef}
              placeholder="Leave blank to keep the same"
            />
          </div>

          <button disabled={loading} type="submit">
            Update
          </button>
        </form>
      </UpdateProfilePage>
    </>
  );
}
