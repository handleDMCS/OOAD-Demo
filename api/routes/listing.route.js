import express from 'express';

import { startListing } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/auth.js';

const router = express.Router();

router.post('/start', verifyToken, startListing);

export default router;