import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    initPrice: {
        type: Number,
        required: true
    },
    image: {
        // using https://placehold.co/
        type: String,
        default: ''
    },
});

const Item = mongoose.model('Item', itemSchema);

export default Item;