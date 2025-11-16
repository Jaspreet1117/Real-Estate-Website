import React from 'react'
import agent from '../assets/images/agent.jpg'
import agent1 from '../assets/images/agent1.jpeg'
import agent2 from '../assets/images/agent2.jpeg'
const OurAgents = () => {
  const agents = [
    {
      id: 1,
      image: agent,
      name: "Marvel",
      role: "PRINCIPAL BROKER",
      email: "marvel@spiralny.com",
      mobile: "917-532-6019",
      office: "212-381-0596"
    },
    {
      id: 2,
      image:agent1,
      name: "Aman",
      role: "LICENSED PROPERTY SALESPERSON",
      email: "aman@spiralny.com",
      mobile: "845-729-5168",
      office: "212-381-0596"
    },
    {
      id: 3,
      image: agent2,
      name: "Sara",
      role: "MAIN SALESPERSON",
      email: "sara@spiralny.com",
      mobile: "551-263-6263",
      office: "212-381-0596"
    }
  ]

  return (
    <section className="ourAgents">
      <h2 className="title">Our Agents</h2>
      <p className="subtitle">
        Our team of experienced industry professionals are eager to advise clients 
        through their real estate needs with the most accurate information.
      </p>
      <div className="agentList">
        {agents.map(agent => (
          <div key={agent.id} className="agentCard">
            <img src={agent.image} alt={agent.name} />
            <div className="agentInfo">
              <h3>{agent.name}</h3>
              <p className="role">{agent.role}</p>
              <p>Email: {agent.email}</p>
              <p>M: {agent.mobile}</p>
              <p>O: {agent.office}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default OurAgents