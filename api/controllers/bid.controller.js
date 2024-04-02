import Room from "../models/room.model.js";
import { errorHandler } from "../utils/error.js";
import { verifyToken } from "../utils/auth";

export const addBid = async (req, res, next) => {
    const { user } = req;
    const { roomId } = req.params;
    const { bidAmount } = req.body;

    try {
        if (!bidAmount) {
            return res.status(400).json({ errors: [{ msg: 'Bid amount is required' }] });
        }
        if (isNaN(bidAmount)) {
            return res.status(400).json({ errors: [{ msg: 'Bid amount must be a number' }] });
        }
        if (bidAmount <= 0) {
            return res.status(400).json({ errors: [{ msg: 'Bid amount must be greater than 0' }] });
        }
        // fix this too % jump
        // if (bidAmount % 1 !== 0) {
        //     return res.status(400).json({ errors: [{ msg: 'Bid amount must be a whole number' }] });
        // }
        let room = await Room.findById(roomId);
        room.bids.push({ user: user.id, bidAmount });
        room = await room.save();
        res.status(200).json(room);
    } catch (error) {
        console.log(error);
        res.status(500).json({ errors: [{ msg: 'Server error' }] });
    }
}

export const getBids = async (req, res, next) => {
    const { user } = req;
    const { roomId } = req.params;

    try {
        let room = await Room.findById(roomId);
        res.status(200).json(room.bids);
    } catch (error) {
        console.log(error);
        res.status(500).json({ errors: [{ msg: 'Server error' }] });
    }
}
