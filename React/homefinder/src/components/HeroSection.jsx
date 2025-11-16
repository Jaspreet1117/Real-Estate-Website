import React from 'react'
import WelcomePageVideo from'../assets/images/WelcomePageVideo.mov'
const HeroSection = () => {
  return (
    <div className="video-container">
      <video autoPlay muted loop>
        <source src={WelcomePageVideo} type="video/mp4" />
      </video>
      <div className="overlay">
        <div className="tagline">
          <i className="fas fa-map-marker-alt"></i> You are here
        </div>
        <h1>Let's Find Your Property</h1>
        <p>
          Welcome to <i>HomeFindr</i> — one of India's top estate platforms  
          where you can easily search, buy, sell, or rent your next property.  
          We connect buyers, sellers, and agents with trusted listings and  
          user-friendly tools, making your property journey smooth and enjoyable.
        </p>
        <a href="/login" className="explore-btn">Explore Now</a>
      </div>
    </div>
  )
}

export default HeroSection