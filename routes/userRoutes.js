import express from 'express';

import {createUser,getAllUsers, getUserById, updateUser, deleteUser} from '../controllers/userController.js';

const router = express.Router()

//CRUD Routes

router.post('/users', createUser)
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById)
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser)

export default router;