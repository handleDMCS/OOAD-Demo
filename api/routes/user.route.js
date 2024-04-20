import express from 'express';
import { 
    deleteAccount, 
    updateAccount,
    getUserById,
    reportUser,
    getReportedUsers,
} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/auth.js';

const router = express.Router();

router.delete('/deleteAccount', verifyToken, deleteAccount);
router.post('/updateAccount/:id', verifyToken, updateAccount);
router.get('/:id', verifyToken, getUserById);
router.post('/reportUser', verifyToken, reportUser);
router.get('/getReportedUsers', verifyToken, getReportedUsers);

export default router;