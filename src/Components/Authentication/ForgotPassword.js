import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import {
  MainInput,
  MainH2,
  MainSection,
  MainButton,
  SecondaryButton,
  MainLabel,
  MainForm,
  GoBackButton,
} from "../StyledComponents";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const history = useHistory();

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
      <MainSection>
        <GoBackButton
          onClick={() => history.goBack()}
          className="back-icon fas fa-angle-left"
        ></GoBackButton>
        <MainH2>Password Reset</MainH2>
        {error && <div variant="danger">{error}</div>}
        {message && <div variant="success">{message}</div>}
        <MainForm onSubmit={handleSubmit}>
          <div id="email">
            <MainInput
              type="email"
              placeholder="Email"
              ref={emailRef}
              required
            />
          </div>

          <MainButton disabled={loading} type="submit">
            Reset Password
          </MainButton>
        </MainForm>

        {/* <Link to="/login">Log In</Link>
        <Link to="/signup">Sign Up</Link> */}
      </MainSection>
    </>
  );
}
