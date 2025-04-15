// tradeController.js
import Trade from '../models/Trade.js';

// Controller function to create a new trade
export const createTrade = async (req, res) => {
  try {
    const { title, description, conditions } = req.body;
    const trade = await Trade.create({ title, description, conditions });
    res.status(201).json({ status: 'success', data: trade });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// Controller function to get all trades
export const getAllTrades = async (req, res) => {
  try {
    const trades = await Trade.find();
    res.status(200).json({ status: 'success', data: trades });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};