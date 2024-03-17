import express from 'express';
import { 
    deleteAccount, 
    updateAccount,
    getUserById,
} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/auth.js';

const router = express.Router();

router.delete('/deleteAccount', verifyToken, deleteAccount);
router.post('/updateAccount/:id', verifyToken, updateAccount);
router.get('/getUserById', verifyToken, getUserById);

export default router;