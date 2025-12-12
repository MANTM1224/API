import { Router } from 'express';
import { CreateUser, Loginuser } from '../controllers/usercontroller.js';

const router = Router();

router.post('/register', CreateUser);
router.post('/login', Loginuser);

export default router;
