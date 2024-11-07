import React, { useState } from 'react';
import './LoginComponent.css';
import axios from 'axios';

const LoginComponent = () => {
  const [activeTab, setActiveTab] = useState('google');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError('');
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await axios.post('https://pushapp-backend.cloud-stacks.com/api/auth/login/google');
      // Handle success and redirect
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const response = await axios.post('https://pushapp-backend.cloud-stacks.com/api/auth/login/facebook');
      // Handle success and redirect
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleEmailLogin = async () => {
    try {
      const response = await axios.post('https://pushapp-backend.cloud-stacks.com/api/auth/login/email', {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // Handle success and redirect
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <img className="logo" src="/path/to/logo.png" alt="Company Logo" />
        <h1>User Login via Multiple Platforms</h1>
      </header>
      <div className="login-tabs">
        <button
          className={activeTab === 'google' ? 'active' : ''}
          onClick={() => handleTabChange('google')}
        >
          Google
        </button>
        <button
          className={activeTab === 'facebook' ? 'active' : ''}
          onClick={() => handleTabChange('facebook')}
        >
          Facebook
        </button>
        <button
          className={activeTab === 'email' ? 'active' : ''}
          onClick={() => handleTabChange('email')}
        >
          Email
        </button>
      </div>
      <div className="login-form">
        {activeTab === 'google' && (
          <button onClick={handleGoogleLogin}>Log in with Google</button>
        )}
        {activeTab === 'facebook' && (
          <button onClick={handleFacebookLogin}>Log in with Facebook</button>
        )}
        {activeTab === 'email' && (
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleEmailLogin}>Log in</button>
          </div>
        )}
        {error && <div className="error-message">{error}</div>}
        <div className="additional-links">
          <a href="/forgot-password">Forgot Password?</a>
          <a href="/signup">Create an Account</a>
        </div>
      </div>
      <footer className="login-footer">
        <p>&copy; 2023 Company Name</p>
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms-of-service">Terms of Service</a>
      </footer>
    </div>
  );
};

export default LoginComponent;
