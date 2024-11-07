import React, { useState } from 'react';
import './LoginPage.css';
import axios from 'axios';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError('');
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      let response;
      if (activeTab === 'google') {
        response = await axios.post('https://pushapp-backend.cloud-stacks.com/api/auth/login/google');
      } else if (activeTab === 'facebook') {
        response = await axios.post('https://pushapp-backend.cloud-stacks.com/api/auth/login/facebook');
      } else {
        response = await axios.post('https://pushapp-backend.cloud-stacks.com/api/auth/login/email', {
          email,
          password,
        }, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
      }
      const { token } = response.data;
      localStorage.setItem('token', token);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="login-page">
      <header className="login-header">
        <img src="/logo.png" alt="Company Logo" className="company-logo" />
        <h1>User Login via Multiple Platforms</h1>
      </header>
      <div className="login-tabs">
        <button 
          className={`login-tab ${activeTab === 'google' ? 'active' : ''}`} 
          onClick={() => handleTabChange('google')}
        >
          Google
        </button>
        <button 
          className={`login-tab ${activeTab === 'facebook' ? 'active' : ''}`} 
          onClick={() => handleTabChange('facebook')}
        >
          Facebook
        </button>
        <button 
          className={`login-tab ${activeTab === 'email' ? 'active' : ''}`} 
          onClick={() => handleTabChange('email')}
        >
          Email
        </button>
      </div>
      <div className="login-form">
        {activeTab === 'email' && (
          <>
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={handleEmailChange} 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={handlePasswordChange} 
            />
          </>
        )}
        <button 
          className="login-button" 
          onClick={handleLogin}
        >
          Log in
        </button>
        {error && <div className="error-message">{error}</div>}
        <div className="additional-links">
          <a href="/recover-password">Forgot Password?</a>
          <a href="/create-account">Create an Account</a>
        </div>
      </div>
      <footer className="login-footer">
        <p>© 2023 Company Name</p>
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms-of-service">Terms of Service</a>
      </footer>
    </div>
  );
};

export default LoginPage;
