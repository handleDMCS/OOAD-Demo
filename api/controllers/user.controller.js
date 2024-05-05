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
    const id = req.params.id;
    console.log(req.params.id);
    console.log("id", id);
    try {
        const user = await User.findById(id);
        if (!user) {
            return next(errorHandler(404, "User not found"));
        }
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
}

export const reportUser = async (req, res, next) => { 
    const { userId } = req.body;
    try {
        const user = await User.findById (userId); 
        if (!user) {
            return next(errorHandler(400, "User not found"));
        }
        user.reports += 1;
        await user.save();
        res.status(200).json("User reported successfully");
    }
    catch (error) {
        next(error);
    }
}

export const getReportedUsers = async (req, res, next) => {
    try {
        const users = await User.find({ reports: { $gt: 0 } });
        if (!users) {
            return next(errorHandler(404, "No users found"));
        }
        res.status(200).json(users);
    }
    catch (error) {
        next(error);
    }
}

