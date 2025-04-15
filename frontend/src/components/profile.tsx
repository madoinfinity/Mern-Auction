import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import '../styles/profile.css';

const Profile: React.FC = () => {
  
  const username = sessionStorage.getItem('username');

  return (
    <div>
      <Navbar />
      <section className="profile-content">
        <div className="top-section">
          <div className="user-info">
            <img src="../userImage.jpg" alt="User Image" className="user-image" />
            <div>
              {}
              <h1>{username}</h1>
              <p className="user-username">@{username}</p>
              <Link to="/updatepassword" className="update-password-btn">Update Password</Link>
              {}
              <Link to="/createoffer" className="create-offer-btn">Create Trade Offer</Link>
            </div>
          </div>
          <div className="cash-counter">
            <p>Cash: $1,000</p>
          </div>
        </div>

        <h2>My Trades</h2>
        {}

        <h2>Offers Sent</h2>
        {}

        {}
        <div className="trade-action">
          <button className="see-trade-status-btn">See Trade Status</button>
        </div>
        {}
        <Link to="/createtrade" className="create-trade-btn">Create New Trade</Link>
      </section>
    </div>
  );
}

export default Profile;
