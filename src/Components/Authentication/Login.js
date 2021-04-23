import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  PrimaryInput,
  PrimaryH2,
  PrimarySection,
  PrimaryButton,
  PrimaryForm,
} from "../StyledComponents";

const ClickableLink = styled.span`
  a {
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

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
       setLoading(false);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }
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
          <ClickableLink>
            <Link to="/forgot-password">Forgot Password?</Link>
          </ClickableLink>
          <PrimaryButton disabled={loading} type="submit">
            Log In
          </PrimaryButton>

          <ClickableLink>
            {" "}
            Need an account?
            <Link to="/signup"> Sign Up</Link>
          </ClickableLink>
        </PrimaryForm>
      </PrimarySection>
    </>
  );
}
