import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/EmailVerification.css";
import useEmailVerification from "../../hooks/useEmailVerification";

const EmailVerification = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const { handleVerifyEmail , loading } = useEmailVerification();

  return (
    <div className="email-verification-wrapper">
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Chargement...</p>
        </div>
      )}
      <div className="form-container email-verification-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleVerifyEmail(verificationCode);
          }}
        >
          <h1>Vérification Email</h1>
          <span>Entrez le code de vérification envoyé à votre email</span>
          <input
            type="text"
            placeholder="Code de vérification"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            Vérifier
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EmailVerification;
