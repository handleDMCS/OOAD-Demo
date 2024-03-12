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
    jump: {
        type: Number,
        required: true
    },
    buyout: {
        type: Number,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
});

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;