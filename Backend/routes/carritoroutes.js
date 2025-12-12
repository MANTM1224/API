import { Router } from 'express';
import * as carritoController from '../controllers/carritoController.js';

const router = Router();

// Agregar artículo al carrito (params: usuarioID, NombreProducto, cantidad)
router.post('/agregar/:usuarioID/:NombreProducto/:cantidad', carritoController.agregarArticulos);

// Traer carrito de un usuario
router.get('/:usuarioID', carritoController.TraerCarrito);

// Vaciar carrito de un usuario
router.delete('/vaciar/:usuarioID', carritoController.VaciarCarrito);

// Eliminar 1 unidad de un producto del carrito (params: carritoID, usuarioID)
router.delete('/producto/:carritoID/:usuarioID', carritoController.EliminarProducto);

export default router;
