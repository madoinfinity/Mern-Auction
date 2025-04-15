import React from 'react';
import Navbar from './navbar'; 
import '../styles/home.css'; 

const Home: React.FC = () => {
  return (
    <div>
      <Navbar /> {}
      <section className="hero">
        <div className="hero-overlay">
          <h1>Welcome to TradeBiz!</h1>
          <p>Your Trading Partner for Life.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
