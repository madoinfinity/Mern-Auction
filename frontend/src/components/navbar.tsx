
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar: React.FC = () => {
    const handleLogout = () => {
      
        sessionStorage.removeItem('username');
    };

    return (
        <nav className="navbar"> {}
            <div className="left-menu">
                <ul>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/browse">Browse</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/createtrade">Create Trade</Link></li> {}
                    
                    <li><Link to="/createoffer">Create Offer</Link></li> {}
                </ul>
            </div>
            <div className="right-menu">
                <ul>
                    <li><Link to="/login" onClick={handleLogout}>Logout</Link></li> {}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
