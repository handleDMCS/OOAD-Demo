import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    description: {
        type: String,
        required: true
    },
    image: {
        // using https://placehold.co/
        type: String,
        default: ''
    },
    initialPrice: {
        type: Number,
        required: true
    },
    currentPrice: {
        type: Number,
        required: true
    },
    jump: {
        type: Number,
        required: true
    },
    startTime: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number,
        required: true
    },
    timer: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'Unlisted'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    sold: {
        type: Boolean,
        default: false
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
    currentBidder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);

export default Item;