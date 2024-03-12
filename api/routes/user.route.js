import express from 'express';
import { deleteAccount } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/auth.js';

const router = express.Router();

router.delete('/deleteAccount', deleteAccount);
router.post('/updateAccount/:id', verifyToken, updateAccount);