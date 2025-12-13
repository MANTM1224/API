import { Router } from 'express';
import { getInventario } from '../controllers/inventarioController.js';

const router = Router();

router.get('/', getInventario);

export default router;
