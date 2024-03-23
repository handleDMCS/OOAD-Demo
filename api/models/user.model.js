import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // using https://avatar.iran.liara.run/public
    avatar: {
        type: String,
        default: ''
    },
    balance: {
        type: Number,
        default: 0
    },
});

const User = mongoose.model('User', userSchema);
export default User;