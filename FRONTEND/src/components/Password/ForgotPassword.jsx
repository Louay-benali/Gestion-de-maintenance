import React from "react";
import "../../styles/ForgotPassword.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useForgotPassword from "../../hooks/useForgotPassword";

const ForgotPassword = () => {
  const { email, setEmail, loading, handleForgotPassword } = useForgotPassword();

  return (
    <div className="forgot-password-wrapper">
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Chargement...</p>
        </div>
      )}
      <div className="form-container forgot-password-container">
        <form onSubmit={handleForgotPassword}>
          <h1>Forgot Password</h1>
          <span>Enter your email to reset your password</span>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>Send Reset Link</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
