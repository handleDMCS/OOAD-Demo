import express from 'express';

import { 
    addItem, 
    deleteItem, 
    getItemsByUser, 
    getVerifiedItems,
    updateItem, 
    verifyItem, 
    unverifyItem 
} from '../controllers/item.controller.js';
import { verifyToken } from '../utils/auth.js';

const router = express.Router();

router.get('/items', verifyToken, getItemsByUser);
router.get('/verifiedItems', verifyToken, getVerifiedItems);
router.post('/addItem', verifyToken, addItem);
router.delete('/deleteItem/:id', verifyToken, deleteItem);
router.post('/updateItem/:id', verifyToken, updateItem);
router.post('/verify', verifyToken, verifyItem)
router.post('unverify', verifyToken, unverifyItem)

export default router;