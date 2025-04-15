import Offer from '../models/Offer.js';

// Controller function to create a new offer
export const createOffer = async (req, res) => {
  try {
    const { user, itemsOffered, cashOffered, tradeOfferedFor } = req.body;
    console.log('User:', user);
    console.log('Items Offered:', itemsOffered);
    console.log('Cash Offered:', cashOffered);
    console.log('Trade Offered For:', tradeOfferedFor);
    const offer = new Offer({ user, itemsOffered, cashOffered, tradeOfferedFor });
    await offer.save();
    res.status(201).json({ success: true, message: 'Offer created successfully', offer });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Could not create offer', error: error.message });
  }
};

// Controller function to accept an offer
export const acceptOffer = async (req, res) => {
  try {
    const { offerId } = req.params;
    const offer = await Offer.findById(offerId);
    // Logic to update trade details and finalize the offer
    res.status(200).json({ success: true, message: 'Offer accepted successfully', offer });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Could not accept offer', error: error.message });
  }
};

// Controller function to reject an offer
export const rejectOffer = async (req, res) => {
  try {
    const { offerId } = req.params;
    const offer = await Offer.findById(offerId);
    // Logic to handle rejection of the offer
    res.status(200).json({ success: true, message: 'Offer rejected successfully', offer });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Could not reject offer', error: error.message });
  }
};

// Controller function to fetch all offers for a specific trade
export const getOffersForTrade = async (req, res) => {
  try {
    const { tradeId } = req.params;
    const offers = await Offer.find({ tradeOfferedFor: tradeId });
    res.status(200).json({ success: true, offers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Could not fetch offers', error: error.message });
  }
};
