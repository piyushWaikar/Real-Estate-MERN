import express from 'express';
import { deleteUser, getUser, getUsers, updateUser, savePost, profilePosts, getNotificationNumber } from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();


// get all the users data .
router.get('/', getUsers);

// Get single user by id
// router.post('/:id', verifyToken, getUser); // we are not using it

// Update user
router.put('/:id', verifyToken, updateUser);

// Delete user
router.delete('/:id', verifyToken, deleteUser);

// Save post
router.post('/save', verifyToken, savePost);

// profile post fetch
router.get('/profilePosts', verifyToken, profilePosts);

//Fetching notification number 
router.get('/notification', verifyToken, getNotificationNumber);

export default router;