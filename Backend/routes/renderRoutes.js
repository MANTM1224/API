import { Router } from 'express';
import { obtenerUsuarioPorId } from '../models/userModel.js';
import { TraerCarrito } from '../models/CarritoModel.js';
import { obtenerVentasPorUsuario } from '../models/ventasModel.js';

const router = Router();

router.get('/iniciarSs', (req, res) => {
    res.render('iniciarSs');
});

router.get('/crearAcc', (req, res) => {
    res.render('crearAcc');
});

// Mostrar página de cuenta
router.get('/cuenta/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await obtenerUsuarioPorId(id);
        if (!usuario) return res.redirect('/render/iniciarSs');
        res.render('cuenta', { usuario });
    } catch (err) {
        console.error('Error render /cuenta:', err);
        res.redirect('/');
    }
});

// Editar cuenta
router.get('/editarCuenta/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await obtenerUsuarioPorId(id);
        if (!usuario) return res.redirect('/render/iniciarSs');
        res.render('editarCuenta', { usuario });
    } catch (err) {
        console.error('Error render /editarCuenta:', err);
        res.redirect('/');
    }
});

// Carrito del usuario
router.get('/carrito/:usuarioID', async (req, res) => {
    const { usuarioID } = req.params;
    try {
        const resultado = await TraerCarrito(usuarioID);
        const carrito = resultado.success ? resultado.data : [];
        res.render('carrito', { usuarioID, carrito });
    } catch (err) {
        console.error('Error render /carrito:', err);
        res.redirect('/');
    }
});

// Historial de ventas
router.get('/historial/:usuarioID', async (req, res) => {
    const { usuarioID } = req.params;
    try {
        const ventas = await obtenerVentasPorUsuario(usuarioID);
        res.render('historial', { usuarioID, ventas });
    } catch (err) {
        console.error('Error render /historial:', err);
        res.redirect('/');
    }
});

export default router;