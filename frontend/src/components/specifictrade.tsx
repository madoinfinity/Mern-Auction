import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './navbar';

const SpecificTrade: React.FC = () => {
    const { tradeId } = useParams<{ tradeId: string }>();

    const [trade, setTrade] = useState<any>(null);
    const [offers, setOffers] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        user: '', // Assuming the user ID is obtained from authentication
        itemsOffered: '',
        cashOffered: 0,
        tradeOfferedFor: tradeId
    });

    const fetchTradeDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/trade/getTradeById/${tradeId}`);
            setTrade(response.data.data);
        } catch (error) {
            console.error('Error fetching trade details:', error);
        }
    };

    const fetchOffers = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/offer/getOffersForTrade/${tradeId}`);
            setOffers(response.data.offers);
        } catch (error) {
            console.error('Error fetching trade offers:', error);
        }
    };

    useEffect(() => {
        fetchTradeDetails();
        fetchOffers();
    }, [tradeId]);

    const handleSubmitOffer = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/offer/createOffer', formData);
            console.log('Offer sent:', response.data);
            
            setFormData({
                user: '', 
                itemsOffered: '',
                cashOffered: 0,
                tradeOfferedFor: tradeId
            });
           
            fetchOffers();
        } catch (error) {
            console.error('Error sending offer:', error);
        }
    };

    const handleAcceptOffer = async (offerId: string) => {
        try {
            const response = await axios.post(`http://localhost:8000/offer/acceptOffer/${offerId}`);
            console.log('Offer accepted:', response.data);
           
            fetchOffers();
        } catch (error) {
            console.error('Error accepting offer:', error);
        }
    };

    const handleRejectOffer = async (offerId: string) => {
        try {
            const response = await axios.post(`http://localhost:8000/offer/rejectOffer/${offerId}`);
            console.log('Offer rejected:', response.data);
           
            fetchOffers();
        } catch (error) {
            console.error('Error rejecting offer:', error);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div>
            <Navbar />
            <div className="trade-detail-container">
                {trade && (
                    <div>
                        <h1 className="trade-title">{trade.title}</h1>
                        <p>Description: {trade.description}</p>
                        <p>Conditions: {trade.conditions.join(', ')}</p>
                    </div>
                )}
                <form onSubmit={handleSubmitOffer}>
                    <h2>Make an Offer</h2>
                    <label htmlFor="itemsOffered">Items Offered:</label>
                    <input type="text" id="itemsOffered" name="itemsOffered" value={formData.itemsOffered} onChange={handleChange} required />
                    <label htmlFor="cashOffered">Cash Offered:</label>
                    <input type="number" id="cashOffered" name="cashOffered" value={formData.cashOffered} onChange={handleChange} required />
                    <button type="submit">Submit Offer</button>
                </form>
                <div className="received-offers">
                    <h2>Received Offers</h2>
                    {offers.map(offer => (
                        <div key={offer._id}>
                            <p>Items Offered: {offer.itemsOffered}</p>
                            <p>Cash Offered: {offer.cashOffered}</p>
                            <button onClick={() => handleAcceptOffer(offer._id)}>Accept</button>
                            <button onClick={() => handleRejectOffer(offer._id)}>Reject</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SpecificTrade;
