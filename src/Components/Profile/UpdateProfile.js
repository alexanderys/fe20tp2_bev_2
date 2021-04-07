import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import {
  SecondarySection,
  GoBackButton,
  PrimaryInput,
  PrimaryLabel,
  SecondaryButton,
  PrimaryForm,
} from "../StyledComponents";

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
          "Profile was successfully updated."
        );
      })
      //   .then(() => {
      //     history.push("/");
      //   })
      .catch(() => {
        setError("Failed to update account. Try logging out and in again");
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
      <SecondarySection>
        <GoBackButton
          onClick={() => history.goBack()}
          className="fas fa-angle-left"
        ></GoBackButton>
        <h1>Update Profile</h1>
        {error && <div>{error}</div>}
        {message && <div>{message}</div>}
        <PrimaryForm onSubmit={handleSubmit}>
          <div>
            <PrimaryLabel>Email</PrimaryLabel>
            <PrimaryInput
              type="email"
              ref={emailRef}
              required
              defaultValue={currentUser.email}
            />
          </div>
          <div>
            <PrimaryLabel>Password</PrimaryLabel>
            <PrimaryInput
              type="password"
              ref={passwordRef}
              placeholder="Leave blank to keep the same"
            />
          </div>
          <div>
            <PrimaryLabel>Password Confirmation</PrimaryLabel>
            <PrimaryInput
              type="password"
              ref={passwordConfirmRef}
              placeholder="Leave blank to keep the same"
            />
          </div>

          <SecondaryButton disabled={loading} type="submit">
            Update
          </SecondaryButton>
        </PrimaryForm>
      </SecondarySection>
    </>
  );
}
