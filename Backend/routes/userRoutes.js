import { Router } from 'express';
import * as  usercontroller from '../controllers/usercontroller.js';
const router = Router();

// Crear usuario
router.post('/createUser', usercontroller.CreateUser);
// Login
router.post('/login', usercontroller.Loginuser);

export default router;