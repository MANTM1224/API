import { Router } from 'express';
import {
	CreateUser,
	Loginuser,
	getUsers,
	getUserById,
	updateUser,
	deleteUser
} from '../controllers/usercontroller.js';

const router = Router();


// CRUD usuarios
router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/register', CreateUser);
router.post('/login', Loginuser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
