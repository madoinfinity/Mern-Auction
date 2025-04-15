import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './navbar';
import '../styles/createoffer.css';

const CreateOffer: React.FC = () => {
    const [formData, setFormData] = useState({
        itemsOffered: '',
        cashOffered: '0',
        tradeOfferedFor: ''
    });
    const [offerCreated, setOfferCreated] = useState<boolean>(false); // State to track if offer is created
    const [offerData, setOfferData] = useState({
        user: '',
        itemsOffered: [],
        cashOffered: 0,
        tradeOfferedFor: ''
    }); // State for offerData

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    
        try {
            // Validate if trade offered for is a valid trade item title
            const isValidTrade = await validateTrade(formData.tradeOfferedFor);
            if (!isValidTrade) {
                alert('Invalid trade offered for. Please enter a valid trade item title.');
                return;
            }
    
            const userId = sessionStorage.getItem('username');
            if (!userId) {
                alert('User ID not found. Please log in again.');
                return;
            }
    
            const itemsOfferedArray = formData.itemsOffered.split(',').map(item => item.trim());
    
            // Send the offer data to the server directly without relying on state
            const response = await axios.post(`http://localhost:8000/offer/createOffer`, {
                user: userId,
                itemsOffered: itemsOfferedArray,
                cashOffered: Number(formData.cashOffered),
                tradeOfferedFor: formData.tradeOfferedFor
            });
            console.log('Offer created:', response.data);
    
            // Reset form data after successful submission
            setFormData({
                itemsOffered: '',
                cashOffered: '0',
                tradeOfferedFor: ''
            });
    
            // Set offer created state to true
            setOfferCreated(true);
    
            alert('Offer created successfully!');
        } catch (error) {
            console.error('Error creating offer:', error);
            alert('Error creating offer. Please try again.');
        }
    };
    

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateTrade = async (tradeTitle: string): Promise<boolean> => {
        try {
            // Fetch all trades from the backend
            const response = await axios.get('http://localhost:8000/trade/getAllTrades');
            const trades = response.data.data;

            console.log('Titles of fetched trades:', trades.map((trade: any) => trade.title));

            // Check if the tradeTitle matches any of the titles in the fetched trades
            const tradeExists = trades.some((trade: any) => trade.title === tradeTitle);
            return tradeExists;
        } catch (error) {
            console.error('Error validating trade:', error);
            return false;
        }
    };

    return (
        <div>
            <Navbar />
            <div className="create-offer-container">
                <a href="#" className="back-link">← Back</a>
                <form id="create-offer-form" onSubmit={handleSubmit}>
                    <h1>Create Your Offer</h1>
                    {}
                    {offerCreated && <p className="success-message">Offer created successfully!</p>}

                    <label htmlFor="itemsOffered">Items Offered:</label>
                    <input type="text" id="itemsOffered" name="itemsOffered" value={formData.itemsOffered} onChange={handleChange} required />

                    <label htmlFor="cashOffered">Cash Offer ($):</label>
                    <input type="number" id="cashOffered" name="cashOffered" min="1" step="any" value={formData.cashOffered} onChange={handleChange} required />

                    <label htmlFor="tradeOfferedFor">Trade Offered For:</label>
                    <input type="text" id="tradeOfferedFor" name="tradeOfferedFor" value={formData.tradeOfferedFor} onChange={handleChange} required />

                    <button type="submit" className="submit-btn">Submit Offer</button>
                </form>
            </div>
        </div>
    );
}

export default CreateOffer;
