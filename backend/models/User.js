import mongoose, { Schema } from 'mongoose';

const userSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        unique: true // Ensure uniqueness 
    },
    Password: {
        type: String,
        required: true
    },
    ItemsOwned: {
        type: Number,
        required: true
    },
    createdTrades: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trade'
    }]
});

const User = mongoose.model('User', userSchema);

export default User;