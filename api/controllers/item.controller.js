import Item from "../models/item.model.js";
import { errorHandler } from "../utils/error.js";

export const addItem = async (req, res, next) => {
    const { name, description, image } = req.body;
    if (!name || !description || !image) {
        return next(errorHandler(400, "All fields are required"));
    }
    const isVerified = false;
    const owner = req.user._id;
    try {
        const item = new Item({
            name,
            owner,
            description,
            image,
            isVerified
        });
        await item.save();
        res.status(201).json(item);
    } catch (error) {
        next(error);
    }
}

export const getItemsByUser = async (req, res, next) => {
    try {
        const items = await Item.find({ owner: req.params.id });
        res.status(200).json(items);
    } catch (error) {
        next(error);
    }
}

export const getVerifiedItems = async (req, res, next) => {
    try {
        const items = await Item.find({ owner: req.params.id, isVerified: true });
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
        if (item.owner.toString() !== req.user._id.toString()) {
            return next(errorHandler(403, "Unauthorized"));
        }
        await item.deleteOne({ _id: id });
        res.status(200).json("Item deleted successfully");
    }
    catch (error) {
        next(error);
    }
}

export const updateItem = async (req, res, next) => {
    const { name, description, image } = req.body;
    if (!name && !description && !image) {
        return next(errorHandler(400, "At least 1 field is required"));
    }
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return next(errorHandler(400, "Item not found"));
        }
        if (item.owner.toString() !== req.user._id.toString()) {
            return next(errorHandler(403, "Unauthorized"));
        }
        if (name) item.name = name;
        if (description) item.description = description;
        if (category) item.category = category;
        if (image) item.image = image;
        await item.save();
        res.status(200).json("Item updated successfully");
    }
    catch (error) {
        next(error);
    }
}

export const verifyItem = async (req, res, next) => {
    const { id } = req.params;
    try {
        const item = await Item.findById(id);
        if (!item) {
            return next(errorHandler(400, "Item not found"));
        }
        item.isVerified = true;
        await item.save();
        
        res.status(200).json("Item verified successfully");
    } catch (error) {
        next(error);
    }
}

export const unverifyItem = async (req, res, next) => {
    const { id } = req.params;
    try {
        const item = await Item.findById(id);
        if (!item) {
            return next(errorHandler(400, "Item not found"));
        }
        item.isVerified = false;
        await item.save();

        res.status(200).json("Item unverified successfully");
    } catch (error) {
        next(error);
    }
}