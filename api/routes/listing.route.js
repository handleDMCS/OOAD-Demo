import express from 'express';

import { 
    startListing,
    getListing
} from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/auth.js';

const router = express.Router();

router.post('/start', verifyToken, startListing);
router.get('/listings', getListing);

export default router;