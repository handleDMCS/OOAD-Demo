import express from 'express';

import { addItem, deleteItem, getItemsByUser, updateItem } from '../controllers/item.controller.js';
import { verifyToken } from '../utils/auth.js';

const router = express.Router();

router.get('/items', verifyToken, getItemsByUser);
router.post('/addItem', verifyToken, addItem);
router.delete('/deleteItem/:id', verifyToken, deleteItem);
router.post('/updateItem/:id', verifyToken, updateItem);

export default router;