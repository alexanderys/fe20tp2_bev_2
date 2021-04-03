import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { MainInput, MainH2, MainSection, PrimaryButton } from '../StyledComponents';

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <>
      <MainSection>
        <MainH2>Sign Up</MainH2>
        {error && <div variant="danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div id="email">

            <MainInput placeholder="Email" type="email" ref={emailRef} required />
          </div>
          <div id="password">

            <MainInput placeholder="Password" type="password" ref={passwordRef} required />
          </div>
          <div id="password-confirm">
            <MainInput placeholder="Confirm password" type="password" ref={passwordConfirmRef} required />
          </div>

          <PrimaryButton disabled={loading} type="submit">
            Sign Up
          </PrimaryButton>
        </form>

        <div>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </MainSection>
    </>
  );
}
