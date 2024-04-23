import express from 'express';

import { 
    addItem, 
    deleteItem, 
    getItemsByUser, 
    updateItem,
    getItemById,
} from '../controllers/item.controller.js';
import { verifyToken } from '../utils/auth.js';

const router = express.Router();

router.get('/items', verifyToken, getItemsByUser);
router.post('/add', verifyToken, addItem);
router.delete('/delete/:id', verifyToken, deleteItem);
router.post('/update/:id', verifyToken, updateItem);
router.get('/:id', verifyToken, getItemById);

export default router;