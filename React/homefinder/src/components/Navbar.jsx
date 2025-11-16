import React from 'react';
import logo from '../assets/images/logo.png'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/" className="logo">
        <img 
          id="logo" 
          src={logo} 
          alt="HOMEFINDER" 
        />
      </Link>
      <ul className="nav-links">
        <li><Link to="/login">Login</Link></li>
        <li><a href="/signup">Sign up</a></li>
        <li><a href="/about">About Us</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;