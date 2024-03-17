import Item from "../models/item.model.js";
import User from "../models/user.model.js";
import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const deleteAccount = async (req, res, next) => {
    const { username } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return next(errorHandler(400, "User not found"));
        }
        await Item.deleteMany({ user: user._id });
        await Listing.deleteMany({ user: user._id });
        await User.deleteOne({ username });

        res.status(200).json("User deleted successfully");
        
    } catch (error) {
        next(error);
    }
}

export const updateAccount = async (req, res, next) => {
    if (req.params.id !== req.user._id) {
        return next(errorHandler(403, "Unauthorized"));
    }
    const { password } = req.body;
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return next(errorHandler(400, "User not found"));
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json("User updated successfully");
    }
    catch (error) {
        next(error);
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return next(errorHandler(404, "User not found"));
        }
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
}