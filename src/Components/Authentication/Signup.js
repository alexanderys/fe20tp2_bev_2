import React, { useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import {
  PrimaryInput,
  PrimaryH2,
  PrimarySection,
  SecondaryButton,
  PrimaryForm,
} from '../StyledComponents';

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const theme = 'dark';
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }
    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch {
      setError('Failed to create an account');
    }
    setLoading(false);
  }

  return (
    <>
      <PrimarySection>
        <PrimaryH2>Sign Up</PrimaryH2>
        {error && <div>{error}</div>}
        <PrimaryForm onSubmit={handleSubmit}>
          <div>
            <PrimaryInput
              type='email'
              placeholder='Email'
              ref={emailRef}
              required
            />
          </div>
          <div>
            <PrimaryInput
              type='password'
              placeholder='Password'
              ref={passwordRef}
              required
            />
          </div>
          <div>
            <PrimaryInput
              type='password'
              placeholder='Repeat password'
              ref={passwordConfirmRef}
              required
            />
          </div>

          <SecondaryButton disabled={loading} type='submit'>
            Sign Up
          </SecondaryButton>
          <Link to='/login'> Already have an account? Login</Link>
        </PrimaryForm>
      </PrimarySection>
    </>
  );
}
