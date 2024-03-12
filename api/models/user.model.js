import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
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
});

const User = mongoose.model('User', userSchema);
export default User;