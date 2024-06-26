import Room from "../models/room.model.js";
import { errorHandler } from "../utils/error.js";

// @route   POST /room/join/:roomId
// @desc    Add user to a room
export const joinRoom = async (req, res, next) => {
  const { user } = req;
  const { roomId } = req.params;

  try {
    let room = await Room.findById(roomId);
    // Check if user already in room
    const userInRoom = room.users.find((roomUser) => {
      return roomUser._id == user.id ? true : false;
    });
    if (userInRoom) {
      return res.status(400).json({ errors: [{ msg: 'Already joined' }] });
    }
    room.users.push(user.id);
    room.populate('users', { password: 0 });
    room = await room.save();
    res.status(200).json({ msg: 'Successfully joined', room });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// @route   GET /room/:roomId
// @desc    Get room details
export const getRoom = async (req, res, next) => {
  const { roomId } = req.params;

  try {
    let room = await Room.findById(roomId).populate('users', { password: 0 });
    res.status(200).json(room);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

export const addBid = async (req, res, next) => {
  const { user } = req;
  const { roomId } = req.params;
  const { bidAmount } = req.body;

  try {
    let room = await Room.findById(roomId);
    room.bids.push({ user: user.id, bidAmount });
    room = await room.save();
    res.status(200).json(room);
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
}