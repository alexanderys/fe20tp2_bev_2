import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import {
  PrimaryInput,
  PrimaryH2,
  PrimarySection,
  PrimaryButton,
  PrimaryForm,
  GoBackButton,
} from "../StyledComponents";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const history = useHistory();
  //useHistory is linked to "react-router-dom", and keeps track of which route/page we're currently on

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  }

  return (
    <>
      <PrimarySection>
        <GoBackButton
          /* goBack() is a built in function. It does the same thing as
          clicking the back arrow in your browser */
          onClick={() => history.goBack()}
          className="fas fa-angle-left"
        ></GoBackButton>
        <PrimaryH2>Password Reset</PrimaryH2>
        {error && <div>{error}</div>}
        {message && <div>{message}</div>}
        <PrimaryForm onSubmit={handleSubmit}>
          <div id="email">
            <PrimaryInput
              type="email"
              placeholder="Email"
              ref={emailRef}
              required
            />
          </div>

          <PrimaryButton disabled={loading} type="submit">
            Reset Password
          </PrimaryButton>
        </PrimaryForm>
      </PrimarySection>
    </>
  );
}
