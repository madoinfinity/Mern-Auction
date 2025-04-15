import express from 'express';
import { createOffer, acceptOffer, rejectOffer, getOffersForTrade } from '../controllers/Offer.js';

export const OfferRouter = express.Router();

OfferRouter.post('/createOffer', createOffer);
OfferRouter.put('/acceptOffer/:offerId', acceptOffer);
OfferRouter.put('/rejectOffer/:offerId', rejectOffer);
OfferRouter.get('/getOffersForTrade/:tradeId', getOffersForTrade);
