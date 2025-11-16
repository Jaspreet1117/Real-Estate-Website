import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PropertySection from './components/PropertySection';
import BestDeals from './components/BestDeals';
import TopCities from './components/TopCities';
import OurAgents from './components/OurAgents';
import Footer from './components/Footer';
import Login from './Pages/Login.jsx';
import SignUp from './Pages/SignUp.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path="/" element={
            <>
              <Navbar />
              <HeroSection />
              <PropertySection />
              <BestDeals />
              <TopCities />
              <OurAgents />
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;