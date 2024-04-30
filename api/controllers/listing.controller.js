import Item from "../models/item.model.js";
import User from "../models/user.model.js";
// import io from "../socket.js";
import { errorHandler } from "../utils/error.js";

// @route POST /api/listing/start
// @desc Start a listing
export const startListing = async (req, res, next) => {
  try {
    const items = await Item.find({ status: "Unlisted" });
    if (!items) 
      return null;
    for (let item of items) {
      if(item.startTime <= Date.now()) {
        await Item.findByIdAndUpdate(
          item._id,
          { status: "Listed" },
        );
        await item.save();
        // io.getListingIO()
        //   .to(item._id.toString())
        //   .emit("listing", { action: "started", item: item });
      }
    }
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    let items = await Item.find({ status: "Listed" }).populate("owner", {
      password: 0,
    });
    if (!items) return next(errorHandler(400, "No items found"));
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

export const getListingByUser = async (req, res, next) => {
  const owner = req.user.id;
  try {
    let items = await Item.find({ owner }).populate("owner", { password: 0 });
    if (!items) return next(errorHandler(400, "No items found"));
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

export const getListingById = async (req, res, next) => {
  const listingId = req.params.id;
  try {
    let item = await Item.findById(listingId).populate("owner", {
      password: 0,
    });
    if (!item) return next(errorHandler(400, "Item not found"));
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

export const getListingBid = async (req, res, next) => {
  const listingId = req.params.id;
  try {
    let item = await Item.findById(listingId).populate("owner", {
      password: 0,
    });
    if (!item) return next(errorHandler(400, "Item not found"));
    res.status(200).json(item.bids);
  } catch (error) {
    next(error);
  }
};

export const userBid = async (req, res, next) => {
  const { id } = req.params;
  const { bid } = req.body;
  const user = await User.findById(req.user.id);
	console.log("id", id);
	console.log("bid", bid);

  try {
    let item = await Item.findById(id).populate("owner", { password: 0 });
    console.log("item", item);
		
		if (!item) 
			return next(errorHandler(400, "Item not found"));
    if (item.owner._id.toString() === user.id.toString())
      return next(errorHandler(403, "Owner cannot bid on own item"));
    if (item.status !== "Listed")
      return next(errorHandler(405, "Item is not active"));
    if (bid <= item.currentPrice)
      return next(errorHandler(406, "Bid must be higher than current price"));
    if (bid % item.jump !== 0)
      return next(errorHandler(407, "Bid must be a multiple of price step"));
    if (user.balance * 5 - bid < 0)
      return next(errorHandler(408, "Insufficient balance"));
    if (user.id.toString() === item.currentBidder.toString())
      return next(errorHandler(409, "You are already the highest bidder"));

    item.currentPrice = bid;
    item.currentBidder = req.user.id;
    item.bids.push({ 
      user:  req.user.id,
      amount: bid 
    });
    await item.save();
    // io.getListingIO()
    //   .to(item._id.toString())
    //   .emit("listing", { action: "bid", item: item });
    res.status(200).json("Bid placed successfully");
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

export const joinListing = async (req, res, next) => {
  const { itemId } = req.body;
  try {
    let item = await Item.findById(itemId).populate("owner", { password: 0 });
    if (!item) return next(errorHandler(400, "Item not found"));
    if (item.owner.toString() === req.user._id.toString())
      return next(errorHandler(403, "Unauthorized"));
    if (item.status !== "Listed")
      return next(errorHandler(400, "Item is not active"));
    item.currentBidder = req.user._id;
    await item.save();
    // io.getListingIO()
    //   .to(item._id.toString())
    //   .emit("listing", { action: "bid", item: item });
    res.status(200).json("Joined listing successfully");
  } catch (error) {
    next(error);
  }
};
