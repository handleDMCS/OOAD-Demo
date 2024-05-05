import express from 'express';

import { 
    listListings,
    getActiveListings,
    getUpcomingListings,
    getPastListings,
    getListingByUser,
    getListingById,
    getListingBid,
    userBid,
} from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/auth.js';

const router = express.Router();

router.get('/list', listListings);
router.get('/active', verifyToken, getActiveListings);
router.get('/upcoming', verifyToken, getUpcomingListings);
router.get('/past', verifyToken, getPastListings)
router.get('/listings/my', verifyToken, getListingByUser);
router.get('/:id', verifyToken, getListingById);
router.get('/bids/:id', verifyToken, getListingBid);
router.put('/bid/:id', verifyToken, userBid);

export default router;