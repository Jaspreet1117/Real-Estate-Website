import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/LoginPage.css';
import loginBackground from '../assets/images/LoginPageBackground.jpg';

const LoginPage = () => {
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const showAlert = (type) => {
    if (type === 'success') {
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 2500);
    } else {
      setShowErrorAlert(true);
      setTimeout(() => setShowErrorAlert(false), 2500);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const validUser = users.find(user =>
      (user.email === formData.username || user.name === formData.username) && 
      user.password === formData.password
    );

    if (validUser) {
      showAlert('success');
      localStorage.setItem("currentUser", JSON.stringify(validUser));

      setTimeout(() => {
        window.location.href = "/homePage.html"; // what to do now 
      }, 2000);
    } else {
      showAlert('error');
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert('Reset link would be sent to your email');
    setShowForgotModal(false);
  };

  const handleSignupRedirect = () => {
    navigate('/signUp');
  };

  const closeModal = () => {
    setShowForgotModal(false);
  };

  return (
    <div className="login-page-body" style={{ backgroundImage: `url(${loginBackground})` }}>
      {/* Success Alert */}
      <div 
        id="loginSuccess" 
        className={`alert alert-success fade ${showSuccessAlert ? 'show' : ''}`} 
        role="alert" 
        style={{ display: showSuccessAlert ? 'block' : 'none' }}
      >
        🎉 Login successful! Redirecting...
      </div>

      {/* Error Alert */}
      <div 
        id="loginError" 
        className={`alert alert-danger fade ${showErrorAlert ? 'show' : ''}`} 
        role="alert" 
        style={{ display: showErrorAlert ? 'block' : 'none' }}
      >
        ❌ Invalid username/email or password
      </div>

      <div className="login-overlay login-custom">
        <div className="login-card">
          <h1>HomeFindr</h1>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="username"
              placeholder="Username or Email" 
              required 
              value={formData.username}
              onChange={handleInputChange}
            />
            <input 
              type="password" 
              name="password"
              placeholder="Password" 
              required 
              value={formData.password}
              onChange={handleInputChange}
            />
            <button type="submit">Login</button>
            <div className="links">
              <a href="#" onClick={(e) => { e.preventDefault(); setShowForgotModal(true); }}>
                Forgot Password?
              </a> | 
              <a href="../SignUpPage.jsx" onClick={(e) => { e.preventDefault(); handleSignupRedirect(); }}>
                Sign Up
              </a>
            </div>
          </form>
        </div>

        {/* Forgot Password Modal */}
        <div className={`login-modal ${showForgotModal ? 'active' : ''}`}>
          <div className="login-modal-content">
            <span className="login-close" onClick={closeModal}>&times;</span>
            <h2>Reset Password</h2>
            <input type="email" placeholder="Enter your email" required />
            <button onClick={handleForgotPassword}>Send Reset Link</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
