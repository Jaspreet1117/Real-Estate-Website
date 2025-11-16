import React from 'react'
import delhi from '../assets/images/delhi.jpg'
import mumbai from '../assets/images/Mumbai.jpg'
import banglore from '../assets/images/Bangalore.jpg'
import pune from '../assets/images/Pune.jpg'
import hyderabad from '../assets/images/Hyderabad.jpg'
const TopCities = () => {
  const cities = [
    {
      id: 1,
      image: delhi,
      name: "Delhi / NCR",
      properties: "228,000+ Properties",
      link: "/delhi"
    },
    {
      id: 2,
      image: banglore,
      name: "Bangalore",
      properties: "62,000+ Properties",
      link: "/banglore"
    },
    {
      id: 3,
      image: pune,
      name: "Pune",
      properties: "65,000+ Properties",
      link: "/pune"
    },
    {
      id: 4,
      image: mumbai,
      name: "Mumbai",
      properties: "70,000+ Properties",
      link: "/mumbai"
    },
    {
      id: 5,
      image: hyderabad,
      name: "Hyderabad",
      properties: "30,000+ Properties",
      link: "/hyderabad"
    }
  ]

  return (
    <section className="topCities">
      <h3 className="subtitle">TOP CITIES</h3>
      <h1 className="title">Explore Real Estate in Popular Indian Cities</h1>
      <div className="citySlider">
        {cities.map(city => (
          <div key={city.id} className="cityCard">
            <img src={city.image} alt={city.name} />
            <div className="cityInfo">
              <a href={city.link}>
                <h4>{city.name}</h4>
              </a>
              <p>{city.properties}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TopCities;