import express from 'express';
import { createTrade, getAllTrades } from '../controllers/Trade.js';

export const TradeRouter = express.Router();

TradeRouter.post('/createTrade', createTrade);
TradeRouter.get('/getAllTrades', getAllTrades);

