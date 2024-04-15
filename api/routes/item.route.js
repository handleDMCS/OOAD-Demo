import express from 'express';

import { 
    addItem, 
    deleteItem, 
    getItemsByUser, 
    updateItem,
} from '../controllers/item.controller.js';
import { verifyToken } from '../utils/auth.js';

const router = express.Router();

router.get('/items', verifyToken, getItemsByUser);
router.post('/add', verifyToken, addItem);
router.delete('/delete/:id', verifyToken, deleteItem);
router.put('/update/:id', verifyToken, updateItem);

export default router;