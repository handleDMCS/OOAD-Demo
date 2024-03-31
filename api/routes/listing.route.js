import express from 'express';

import { 
    getListing,
    startListing
} from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/auth.js';

const router = express.Router();

router.post('/start', verifyToken, startListing);
router.get('/listings', getListing);

export default router;