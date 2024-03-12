import Item from "../models/item.model";
import User from "../models/user.model";
import Listing from "../models/listing.model";
import { errorHandler } from "../utils/error";

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

export const addItem = async (req, res, next) => {
    const { name, description, category, initPrice, image } = req.body;
    if (!name || !description || !category || !initPrice) {
        return next(errorHandler(400, "All fields are required"));
    }
    try {
        const item = new Item({
            name,
            description,
            category,
            initPrice,
            image,
            user: req.user._id
        });
        await item.save();
        res.status(201).json(item);
    } catch (error) {
        next(error);
    }
}

export const getItems = async (req, res, next) => {
    try {
        const items = await Item.find({ user: req.user._id });
        res.status(200).json(items);
    } catch (error) {
        next(error);
    }
}

export const deleteItem = async (req, res, next) => {
    const { id } = req.params;
    try {
        const item = await Item.findById(id);
        if (!item) {
            return next(errorHandler(400, "Item not found"));
        }
        await item.deleteOne({ _id: id });
        res.status(200).json("Item deleted successfully");
    }
    catch (error) {
        next(error);
    }
}

// export const updateItem = async (req, res, next) => {