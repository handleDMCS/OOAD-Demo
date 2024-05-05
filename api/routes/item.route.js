import express from 'express';

import { 
    getAllItems,
    addItem, 
    deleteItem, 
    getItemsByUser, 
    updateItem,
    getItemById,
    getPendingItems,
    getVerifiedItems,
    verifyItem,
    declineItem,
    revertItem,
} from '../controllers/item.controller.js';
import { verifyToken } from '../utils/auth.js';

const router = express.Router();

router.get('/all', getAllItems);
router.get('/items', verifyToken, getItemsByUser);
router.post('/add', verifyToken, addItem);
router.delete('/delete/:id', verifyToken, deleteItem);
router.post('/update/:id', verifyToken, updateItem);
router.get('/pending', verifyToken, getPendingItems);
router.get('/verified', verifyToken, getVerifiedItems);
router.post('/verify/:id', verifyToken, verifyItem);
router.post('/decline/:id', verifyToken, declineItem);
router.post('/revert/:id', verifyToken, revertItem);
router.get('/:id', verifyToken, getItemById);

export default router;