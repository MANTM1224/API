import { Router } from 'express';
import * as  usercontroller from '../controllers/usercontroller.js';
const router = Router();

// Crear usuario
router.post('/createUser', usercontroller.CreateUser);
// Login
router.post('/login', usercontroller.Loginuser);
// Actualizar usuario
router.put('/:id', usercontroller.updateUser);
// Eliminar usuario
router.delete('/:id', usercontroller.deleteUser);

export default router;