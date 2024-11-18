import React, { useState } from 'react';
import axios from 'axios';
import "../../styles/auth-pages-styles/ForgotPassword.css";
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/admin/forget-password', { email });
      setMessage(response.data.message);
      setIsResendDisabled(true);
      setTimeout(() => setIsResendDisabled(false), 60000); // Resend enabled after 1 minute
    } catch (error) {
      setMessage('Error sending reset link. Please try again.');
    }
  };

  return (
    <div className="forgot-password-wrapper">
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={isResendDisabled}>
            {isResendDisabled ? 'Resend in 1 min' : 'Send Reset Link'}
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default ForgotPassword;
