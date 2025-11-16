import React from 'react'

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-col">
          <h4>HomeFinder</h4>
          <ul>
            <li><a href="#">Mobile Apps</a></li>
            <li><a href="#">Our Services</a></li>
            <li><a href="#">Price Trends</a></li>
            <li><a href="#">Post your Property</a></li>
            <li><a href="#">Real Estate Investments</a></li>
            <li><a href="#">Articles</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers with us</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Feedback</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Our Partners</h4>
          <ul>
            <li><a href="#">Naukri.com - Jobs</a></li>
            <li><a href="#">Jeevansathi.com - Matrimonials</a></li>
            <li><a href="#">Shiksha.com - Education</a></li>
            <li><a href="#">Policybazaar.com - Insurance</a></li>
            <li><a href="#">Proptiger</a></li>
            <li><a href="#">Realtor.com</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact Us</h4>
          <p>
            Toll Free: <strong>1800 41 99099</strong><br />
            Mon-Sun (9:30 AM - 6:30 PM)<br />
            Email: <a href="mailto:homefindrlimited@gmail.com?subject=enquiry&body=Please send me your latest real estate details">
              feedback@homefindr.com
            </a>
          </p>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        ©2025 HomeFinder Pvt. Ltd | Designed with 🤍
      </div>
    </footer>
  )
}

export default Footer