import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
      <section>
        <h2>Password Reset</h2>
        {error && <div variant="danger">{error}</div>}
        {message && <div variant="success">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div id="email">
            <label>Email</label>
            <input type="email" ref={emailRef} required />
          </div>

          <button disabled={loading} type="submit">
            Reset Password
          </button>
        </form>

        <div>
          <Link to="/login">Log In</Link>
        </div>
      </section>

      <div>
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}
