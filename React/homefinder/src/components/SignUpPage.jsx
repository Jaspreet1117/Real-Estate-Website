import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/SignUp.css';
import signUpVideo from '../assets/images/signup.mov';

const SignUpPage= () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pwd: '',
    rememberMe: false
  });
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Set video playback rate
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.3;
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const showAlert = (type) => {
    if (type === 'success') {
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000);
    } else {
      setShowErrorAlert(true);
      setTimeout(() => setShowErrorAlert(false), 3000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get stored users array
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check for duplicate emails
    const exists = users.find(user => user.email === formData.email);
    if (exists) {
      showAlert('error');
      return;
    }

    // Add new user object
    users.push({ 
      name: formData.name, 
      email: formData.email, 
      password: formData.pwd 
    });

    // Store back in localStorage
    localStorage.setItem("users", JSON.stringify(users));

    showAlert('success');

    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="containerl">
        {/* Error Alert */}
        <div id="errorAlert" className={`alert alert-danger d-flex align-items-center fade ${showErrorAlert ? 'show' : ''}`} role="alert" style={{display: showErrorAlert ? 'flex' : 'none'}}>
            <div>⚠️ User already exists. Please login instead.</div>
        </div>

        {/* Success Alert */}
        <div id="successAlert" className={`alert alert-success d-flex align-items-center fade ${showSuccessAlert ? 'show' : ''}`} role="alert" style={{display: showSuccessAlert ? 'flex' : 'none'}}>
            <div>🎉 Signup successful! Redirecting to login...</div>
        </div>

        <video ref={videoRef} autoPlay muted loop id="myVideo">
            <source src={signUpVideo} type="video/mp4" />
        </video>

        <div className="signUp">
            <h1 id="signupHeading">Sign Up</h1>
            <p>HomeFindr</p>
            <div className="signUpForm">
                <div className="google">
                    <i className="fa-brands fa-google" style={{color: '#e50b0b'}}></i>
                    <span>Sign Up with Google</span>
                </div>
                <div className="or"><p id ="or">OR</p></div>

                <div className="form">
                    <form id="signupForm" onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            placeholder="Name" 
                            required 
                            value={formData.name}
                            onChange={handleInputChange}
                        /><br />
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="Email or Phone number" 
                            required 
                            value={formData.email}
                            onChange={handleInputChange}
                        /><br />
                        <input 
                            type="password" 
                            id="pwd" 
                            name="pwd" 
                            placeholder="Password" 
                            required 
                            value={formData.pwd}
                            onChange={handleInputChange}
                        /><br />

                        <div className="submit">
                            <p>Already have an account ? <a id="login" href="#" onClick={handleLoginRedirect}>Login</a></p>
                            <button type="submit">Sign Up</button>
                        </div>

                        <div className="rememberMe">
                            <input 
                                type="checkbox" 
                                id="rememberMe" 
                                name="rememberMe" 
                                checked={formData.rememberMe}
                                onChange={handleInputChange}
                            /> Remember Me
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
};

export default SignUpPage;