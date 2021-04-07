import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import {
  PrimaryInput,
  PrimaryH2,
  PrimarySection,
  PrimaryButton,
  PrimaryForm,
} from "../StyledComponents";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  return (
    <>
      <PrimarySection>
        <PrimaryH2>Log In</PrimaryH2>
        {error && <div>{error}</div>}
        <PrimaryForm onSubmit={handleSubmit}>
          <div>
            <PrimaryInput
              type="email"
              placeholder="Email"
              ref={emailRef}
              required
            />
          </div>
          <div>
            <PrimaryInput
              type="password"
              placeholder="Password"
              ref={passwordRef}
              required
            />
          </div>
          <Link to="/forgot-password">Forgot Password?</Link>
          <PrimaryButton disabled={loading} type="submit">
            Log In
          </PrimaryButton>
          <Link to="/signup"> Need an account? Sign Up</Link>
        </PrimaryForm>
      </PrimarySection>
    </>
  );
}
