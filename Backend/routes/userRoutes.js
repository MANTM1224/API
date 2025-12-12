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
router.get('/carrito/:usuarioID', renderCarrito);
router.get('/cuenta/:usuarioID', renderCuenta);
router.get('/editarCuenta/:usuarioID', renderEditarCuenta);
router.get('/crearAcc', renderCrearAcc);
router.get('/iniciarSs', renderIniciarSs);
router.get('/manipularProductos', renderManipularProductos);
router.get('/historial/:usuarioID', renderHistorial);

export default router;