import express from 'express';
import { joinRoom, getRoom } from '../controllers/room.controller.js';

const router = express.Router();

router.get('/join/:roomId', joinRoom);
router.get('/:roomId', getRoom);

export default router;