import React from 'react'
import Deal1 from '../assets/images/Deal1.jpg'
import Deal2 from '../assets/images/Deal2.jpeg'
import Deal3 from '../assets/images/Deal3.jpeg'
import Deal4 from '../assets/images/Deal4.jpeg'
const BestDeals = () => {
  const deals = [
    {
      id: 1,
      image: Deal1,
      title: "2 BHK Apartment",
      price: "₹45 Lakhs · Delhi",
      link: "/visit"
    },
    {
      id: 2,
      image: Deal2,
      title: "Luxury Villa",
      price: "₹2.5 Crore · Gurgaon",
      link: "/visit"
    },
    {
      id: 3,
      image: Deal3,
      title: "3 BHK Builder Floor",
      price: "₹75 Lakhs · Noida",
      link: "/visit"
    },
    {
      id: 4,
      image: Deal4,
      title: "Farmhouse",
      price: "₹1.2 Crore · Manesar",
      link: "/visit"
    }
  ]

  return (
    <div id="best-deal">
      <h2>Best Property Deals</h2>
      <p>Check out the latest handpicked properties at amazing prices.</p>
      <div className="deals-container">
        {deals.map(deal => (
          <div key={deal.id} className="deal-card">
            <img src={deal.image} alt={deal.title} />
            <h3>{deal.title}</h3>
            <p>{deal.price}</p>
            <a href={deal.link} className="explore-btn">View Details</a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BestDeals