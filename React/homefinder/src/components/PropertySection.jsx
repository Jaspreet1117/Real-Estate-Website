import React from 'react'
import PropertyImage from '../assets/images/PropertyImage.jpg'
const PropertySection = () => {
  return (
    <div className="property-section">
      <div className="property-image">
        <img src={PropertyImage} alt="Living Room" />
      </div>
      <div className="property-text">
        <h3>BUY A HOME</h3>
        <h2>Find, Buy & Own Your Dream Home</h2>
        <p>
          Explore from Apartments, land, builder floors, villas and more.
        </p>
        <a href="/signup" className="explore-btn">Explore Buying</a>
      </div>
    </div>
  )
}

export default PropertySection;