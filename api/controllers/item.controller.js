import Item from "../models/item.model.js";
import { errorHandler } from "../utils/error.js";

export const getAllItems = async (req, res, next) => {
    try {
        const items = await Item.find({}, {isVerified: 1, status: 1});
        res.status(200).json(items);
    } catch (error) {
        next(error);
    }
}

export const addItem = async (req, res, next) => {
    const { name, description, initialprice, jump, duration, image, startTime } = req.body;
    if (!name || !description || !initialprice || !jump || !duration) {
        return next(errorHandler(400, "All fields are required"));
    }
    if (initialprice <= 0) {
        return next(errorHandler(400, "Initial price must be greater than 0"));
    }
    if (duration <= 0) {
        return next(errorHandler(400, "Duration must be greater than 0"));
    }
    if (jump <= 0) {
        return next(errorHandler(400, "Price step must be greater than 0"));
    }

    const owner = req.user.id;
    try {
        const item = new Item({
            productName: name,
            owner,
            description,
            initialPrice: initialprice,
            currentPrice: initialprice,
            startTime,
            jump,
            duration,
            timer: duration,
            status: "Unlisted",
            isVerified: false,
            image
        });

        await Item.create(item);
        res.status(201).json(item);
    } catch (error) {
        next(error.message);
    }
}

export const getItemsByUser = async (req, res, next) => {
    try {
        const items = await Item.find({ owner: req.user._id });
        res.status(200).json(items);
    } catch (error) {
        next(error);
    }
}

export const getVerifiedItems = async (req, res, next) => {
    try {
        const items = await Item.find({ isVerified: true, status: "Unlisted" });
        res.status(200).json(items);
    } catch (error) {
        next(error);
    }
}

export const getPendingItems = async (req, res, next) => {
    try {
        const items = await Item.find({ isVerified: false });
        res.status(200).json(items);
    } catch (error) {
        next(error);
    }
}

export const deleteItem = async (req, res, next) => {
    const id = req.params.id;
    console.log("id", id);
    try {
        const item = await Item.findById(id);
        if (!item) {
            return next(errorHandler(400, "Item not found"));
        }
        if (item.owner.toString() !== req.user.id.toString()) {
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
    const { productName, description, initialPrice, jump, duration, image } = req.body;
    const id = req.params.id;

    console.log("id", id);
    console.log("productName", productName);
    console.log("description", description);
    console.log("initialPrice", initialPrice);
    console.log("jump", jump);
    console.log("duration", duration);
    console.log("image", image);


    if (!productName || !description || !initialPrice || !jump || !duration) {
        return next(errorHandler(400, "All fields are required"));
    }

    try {
        if (initialPrice <= 0) {
            return next(errorHandler(401, "Initial price must be greater than 0"));
        }
        if (duration <= 0) {
            return next(errorHandler(402, "Duration must be greater than 0"));
        }
        if (jump <= 0) {
            return next(errorHandler(403, "Price step must be greater than 0"));
        }

        const item = await Item.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!item) {
            return next(errorHandler(404, "Item not found"));
        }
        if (item.owner._id.toString() !== req.user.id.toString()) {
            return next(errorHandler(405, "Unauthorized"));
        }

        // if (productName) item.productName = productName;
        // if (productName != item.productName) item.productName = productName;
        // if (description) item.description = description;
        // if (initialPrice) item.initialPrice = initialPrice;
        // if (jump) item.jump = jump;
        // if (image) item.image = image;
        // await item.save();
        res.status(200).json(item);
    }
    catch (error) {
        next(error);
    }
}

export const getItemById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const item = await Item.findById(id);
        if (!item) {
            return next(errorHandler(400, "Item not found"));
        }
        res.status(200).json(item);
    }
    catch (error) {
        next(error);
    }
}

export const verifyItem = async (req, res, next) => {
    console.log("req.params.id", req.params.id);
    try {
        const item = await Item.findByIdAndUpdate(
            req.params.id,
            { isVerified: true, status: "Unlisted" },
            { new: true }
        );
        if (!item) {
            return next(errorHandler(400, "Item not found"));
        }
        res.status(200).json("Item verified successfully");
    } catch (error) {
        next(error);
    }
}

export const declineItem = async (req, res, next) => {
    const { id } = req.params.id;
    try {
        const item = await Item.findByIdAndUpdate(
            id,
            { isVerified: false , status: "Declined"},
            { new: true }
        );
        
        if (!item) {
            return next(errorHandler(404, "Item not found"));
        }

        res.status(200).json("Item unverified successfully");
    } catch (error) {
        next(error);
    }
}

export const revertItem = async (req, res, next) => {
    const { id } = req.params.id;
    try {
        const item = await Item.findByIdAndUpdate(
            id,
            { isVerified: false, status: "Unlisted" },
            { new: true }
        );
        if (!item) {
            return next(errorHandler(404, "Item not found"));
        }
        res.status(200).json("Item reverted successfully");
    }
    catch (error) {
        next(error);
    }
}