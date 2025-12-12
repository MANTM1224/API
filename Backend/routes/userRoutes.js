import { Router } from 'express';
import { 
    getInventario,
    renderCarrito,
    renderCuenta,
    renderEditarCuenta,
    renderCrearAcc,
    renderIniciarSs,
    renderManipularProductos,
    renderHistorial
} from '../controllers/inventarioController.js';

const router = Router();

// Página principal
router.get('/', getInventario);

// Rutas de vistas

export default router;