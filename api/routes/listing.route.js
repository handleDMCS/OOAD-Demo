import express from 'express';

import { 
    startListing,
    getListings,
    getListingById,
    getListingByUser,
} from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/auth.js';

const router = express.Router();

router.post('/start', verifyToken, startListing);
router.get('/listings', verifyToken, getListings);
// router.get('/:id', verifyToken, getListingById);
router.get('/listings/my', verifyToken, getListingByUser);
router.get('/listings/:id', verifyToken, getListingById);

export default router;