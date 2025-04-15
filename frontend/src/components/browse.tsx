import React, { useState, useEffect } from 'react';
import Navbar from './navbar'; 
import axios from 'axios'; 
import { Link } from 'react-router-dom';
import '../styles/browse.css'; 

const Browse: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [trades, setTrades] = useState<any[]>([]); // State to store fetched trades

    useEffect(() => {
        fetchTrades(); 
    }, []);

    const fetchTrades = async () => {
        try {
            const response = await axios.get('http://localhost:8000/trade/getAllTrades'); // Fetch trades from the server
            setTrades(response.data.data); // Set the fetched trades in state
        } catch (error) {
            console.error('Error fetching trades:', error);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    // Filter trades based on search query
    const filteredTrades = trades.filter(trade =>
        trade.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <Navbar />
            <section className="hero">
                <div className="hero-overlay">
                    <h1>Browse Trades</h1>
                    <input
                        type="text"
                        id="searchBar"
                        placeholder="Search trades..."
                        value={searchQuery}
                        onChange={handleChange}
                    />
                </div>
            </section>

            <section className="trades-list">
                {filteredTrades.map(trade => (
                    <div key={trade._id} className="trade-item">
                        <div className="trade-info">
                            <h3 className="trade-title">{trade.title}</h3>
                            <p className="trade-description">{trade.description}</p>
                            <div className="trade-conditions">
                                Conditions: {trade.conditions.map((condition: string, index: number) => (
                                    <span key={index} className="condition-badge">{condition}</span>
                                ))}
                            </div>
                        </div>
                        
                        {}
                        <Link to={`/specifictrade/${trade._id}`} className="send-offer-btn">View Trade</Link>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Browse;
