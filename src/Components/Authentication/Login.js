import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import styled from 'styled-components';
import { MainInput, MainH2, MainSection, MainButton } from '../StyledComponents';

const TempBackX = styled.div`
  margin: 10px;
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
      history.push("/");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  return (
    <>
      <TempBackX>
        {/* Need an account? <Link to="/signup">Sign Up</Link> */}
        <Link to="/signup">X</Link>
      </TempBackX>

      <MainSection>
        <MainH2>Log In</MainH2>
        {error && <div variant="danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div id="email">

            <MainInput type="email" placeholder="Email" ref={emailRef} required />
          </div>
          <div id="password">

            <MainInput type="password" placeholder="Password" ref={passwordRef} required />
          </div>

          <MainButton disabled={loading} type="submit">
            Log In
          </MainButton>
        </form>

        <div>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>



      </MainSection>
    </>
  );
}
