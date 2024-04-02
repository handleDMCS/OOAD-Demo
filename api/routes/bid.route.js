import express from 'express';

import { addBid, getBids } from '../controllers/room.controller.js';

const router = express.Router();

router.post('/addBid/:roomId', addBid);
router.get('/getBids/:roomId', getBids);

export default router;