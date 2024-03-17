import Item from "../models/item.model.js";
import User from "../models/user.model.js";
import io from "../socket.js";
import { errorHandler } from "../utils/error.js";

// const io = require("../socket.js");

// @route POST /api/listing/start
// @desc Start a listing
export const startListing = async (req, res, next) => {
    const { itemId, startingPrice, jump, buyout, timer } = req.body;

    try {
        let item = await Item.findById(itemId).populate('owner', {password: 0});
        if (!item) return next(errorHandler(400, "Item not found"));
        if (item.owner.toString() !== req.user._id.toString()) return next(errorHandler(403, "Unauthorized"));
        if (item.status !== "Listed") return next(errorHandler(400, "Item is not active"));
        item.status = "Listed";
        await item.save();

        // io.getIO().emit("listing", { action: "start", item: item });
        io.getListingIO()
        .to(item._id.toString())
        .emit("listing", { action: "started", item: item });
        
        res.status(200).json("Listing started successfully");

        // timer rundown
        item.timer = parseInt(item.duration);
        let duration = parseInt(item.duration);
        let timer = parseInt(item.timer);
        let timerInterval = setInterval(async () => {
            timer -= 1;
            await item.updateOne({ timer: timer });
            io.getListingIO()
            .to(item._id.toString())
            .emit("timer", { 
                action: "timerUpdate", 
                data: { timer: timer, _id: item._id },
            });
        }, 1000);

        setTimeout(async () => {
            clearInterval(timerInterval);

            let listingEnd = await Item.findById(item._id).populate('owner', {password: 0});
            listingEnd.status = "Ended";
            listingEnd.timer = 0;
            if(listingEnd.currentBidder){
                let user = await User.findById(listingEnd.currentBidder);
                listingEnd.owner = listingEnd.currentBidder;
                await listingEnd.save();

                io.getListingIO()
                .to(listingEnd._id.toString())
                .emit("listing", { action: "sold", item: listingEnd });
            } else {
                io.getListingIO()
                .to(listingEnd._id.toString())
                .emit("listing", { action: "not sold", item: listingEnd });
                await listingEnd.save();
            }

        }, (duration + 1) * 1000);

    } catch (error) {
        next(error);
    }
}