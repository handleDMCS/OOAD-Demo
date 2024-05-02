import express from 'express';

import { 
    startListing,
    getListings,
    getListingByUser,
    getListingById,
    getListingBid,
    userBid,
} from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/auth.js';

const router = express.Router();

router.get('/list', startListing);
router.get('/listings', verifyToken, getListings);
router.get('/listings/my', verifyToken, getListingByUser);
router.get('/:id', verifyToken, getListingById);
router.get('/bids/:id', verifyToken, getListingBid);
router.put('/bid/:id', verifyToken, userBid);

export default router;