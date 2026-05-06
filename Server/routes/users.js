import express from 'express';
import {
  getAllUsers, getUserById, getUserByUsername,
  createUser, updateUser, deleteUser, loginUser
} from '../controllers/usersController.js';
import { verifyToken, checkOwnership } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/', createUser);
router.get('/', (req, res, next) => req.query.username ? getUserByUsername(req, res) : getAllUsers(req, res));
router.get('/:id', getUserById);

router.get('/me/profile', verifyToken, (req, res) => {
  res.json({ user: req.user, message: 'User profile retrieved successfully' });
});

router.put('/:id', verifyToken, checkOwnership, updateUser);
router.patch('/:id', verifyToken, checkOwnership, updateUser);
router.delete('/:id', verifyToken, checkOwnership, deleteUser);

export default router;
