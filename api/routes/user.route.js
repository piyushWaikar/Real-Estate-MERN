import express from 'express';
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();


// get all the users data .
router.get('/', getUsers);

// Get single user by id
router.post('/:id', verifyToken, getUser);

// Update user
router.put('/:id', verifyToken, updateUser);

// Delete user
router.put('/:id', verifyToken, deleteUser);



export default router;