import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import {
  MainInput,
  MainH2,
  MainSection,
  SecondaryButton,
  MainForm,
} from "../StyledComponents";

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
        <MainForm onSubmit={handleSubmit}>
          <div id="email">
            <MainInput
              type="email"
              placeholder="Email"
              ref={emailRef}
              required
            />
          </div>
          <div id="password">
            <MainInput
              type="password"
              placeholder="Password"
              ref={passwordRef}
              required
            />
          </div>
          <div id="password-confirm">
            <MainInput
              type="password"
              placeholder="Repeat password"
              ref={passwordConfirmRef}
              required
            />
          </div>

          <SecondaryButton disabled={loading} type="submit">
            Sign Up
          </SecondaryButton>
          <Link to="/login"> Already have an account? Login</Link>
        </MainForm>
      </MainSection>
    </>
  );
}

{
  /* <MainSection>
  <MainH2>Log In</MainH2>
  {error && <div variant="danger">{error}</div>}
  <MainForm onSubmit={handleSubmit}>
    <div id="email">
      <MainInput type="email" placeholder="Email" ref={emailRef} required />
    </div>
    <div id="password">
      <MainInput
        type="password"
        placeholder="Password"
        ref={passwordRef}
        required
      />
    </div>
    <Link to="/forgot-password">Forgot Password?</Link>
    <MainButton disabled={loading} type="submit">
      Log In
    </MainButton>
    <Link to="/signup"> Need an account? Sign Up</Link>
  </MainForm>
</MainSection>; */
}
