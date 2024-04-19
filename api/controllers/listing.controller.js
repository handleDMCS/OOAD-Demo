import Item from "../models/item.model.js";
import User from "../models/user.model.js";
import io from "../socket.js";
import { errorHandler } from "../utils/error.js";

// @route POST /api/listing/start
// @desc Start a listing
export const startListing = async (req, res, next) => {
  const { itemId, startingPrice, jump, buyout, timer } = req.body;

  try {
    let item = await Item.findById(itemId).populate("owner", { password: 0 });
    if (!item) return next(errorHandler(400, "Item not found"));
    if (item.owner.toString() !== req.user._id.toString())
      return next(errorHandler(403, "Unauthorized"));
    if (item.status !== "Listed")
      return next(errorHandler(400, "Item is not active"));
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

      let listingEnd = await Item.findById(item._id).populate("owner", {
        password: 0,
      });
      listingEnd.status = "Ended";
      listingEnd.timer = 0;
      if (listingEnd.currentBidder) {
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
  const user = req.user;
	console.log(id);
	console.log(bid);
	console.log(user);

  try {
    let item = await Item.findById(id).populate("owner", { password: 0 });
    console.log(item);
		
		if (!item) 
			return next(errorHandler(400, "Item not found"));
    if (item.owner._id.toString() === user.id.toString())
      return next(errorHandler(403, "Owner cannot bid on own item"));
    if (item.status !== "Listed")
      return next(errorHandler(400, "Item is not active"));
    if (bid <= item.currentPrice)
      return next(errorHandler(400, "Bid must be higher than current price"));
    if (bid % item.jump !== 0)
      return next(errorHandler(400, "Bid must be a multiple of price step"));

    item.currentPrice = bid;
    item.currentBidder = req.user.id;
    item.bids.push({ user: req.user.id , amount: bid });
    await item.save();
    // io.getListingIO()
    //   .to(item._id.toString())
    //   .emit("listing", { action: "bid", item: item });
    res.status(200).json("Bid placed successfully");
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

export const deleteListing = async (req, res, next) => {
  const { id } = req.params;
  try {
    let item = await Item.findById(id).populate("owner", { password: 0 });
    if (!item) return next(errorHandler(400, "Item not found"));
    if (item.owner._id.toString() !== req.user._id.toString())
      return next(errorHandler(403, "Unauthorized"));
    item.status = "Unlisted";
    await item.save();
    io.getListingIO()
      .to(item._id.toString())
      .emit("listing", { action: "deleted", item: item });
    res.status(200).json("Listing deleted successfully");
  } catch (error) {
    next(error);
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
    io.getListingIO()
      .to(item._id.toString())
      .emit("listing", { action: "bid", item: item });
    res.status(200).json("Joined listing successfully");
  } catch (error) {
    next(error);
  }
};
