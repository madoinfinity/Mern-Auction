import mongoose, { Schema } from 'mongoose';

const tradeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    conditions: {
        type: [String],
        required: true
    },
    offers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offer'
    }],
    acceptedOffer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offer'
    }
});

const Trade = mongoose.model('Trade', tradeSchema);

export default Trade;
