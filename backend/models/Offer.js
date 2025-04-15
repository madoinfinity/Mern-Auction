import mongoose, { Schema } from 'mongoose';

const offerSchema = new mongoose.Schema({
  user: { 
    type: String,
    ref: 'User',
    required: true
  },
  itemsOffered: [{ 
    type: String, 
    required: true
  }],
  cashOffered: {
    type: Number, 
    default: 0 
  },
  tradeOfferedFor: { 
    type: String,
    ref: 'Trade',
    required: true
  }
});

const Offer = mongoose.model('Offer', offerSchema);

export default Offer; 
