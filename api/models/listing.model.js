import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
    },
    startingPrice: {
        type: Number,
        required: true
    },
    currentPrice: {
        type: Number,
        required: true
    },
    // consider to delete
    jump: {
        type: Number,
        required: true
    },
    buyout: {
        type: Number,
        required: true
    },
    timer: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: 'Active'
    },
    currentBidder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    bids: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        amount: {
            type: Number,
            required: true
        },
        time: {
            type: Date,
            default: Date.now
        }
    }],
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing',
    }
}, { timestamps: true });

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;