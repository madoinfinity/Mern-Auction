import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

import Login from './components/login';
import Signup from './components/signup'; 
import Home from './components/home'; 
import Browse from './components/browse'; 
import Profile from './components/profile';
import UpdatePassword from './components/changepassword';
import CreateTrade from './components/createtrade'
import SpecificTrade from './components/specifictrade' 
import CreateOffer from './components/createoffer';

function App() {
    const user = sessionStorage.getItem('username');

    if (!user && !['/login', '/signup'].includes(window.location.pathname)) {
        return <Navigate to="/login" />;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/updatepassword" element={<UpdatePassword />} />
                <Route path="/browse" element={<Browse />} />
				<Route path="/createtrade" element={<CreateTrade />} />
				<Route path="/specifictrade" element={<SpecificTrade />} />
				<Route path="/createoffer" element={<CreateOffer />} />
				<Route path="/specifictrade/:tradeId" element={<SpecificTrade />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
