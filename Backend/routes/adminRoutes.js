import { Router } from 'express';
import { crearProducto, actualizarProducto, eliminarProducto } from "../controllers/adminController.js";
import {
    cargarInventario,
    obtenerProductoInventarioPorId,
    crearProductoAdmin,
    actualizarProductoAdmin,
    eliminarProductoAdmin
} from '../models/adminModel.js';

const router = Router();

// Rutas API REST para JSON
router.post('/api/productos', crearProducto);
router.put('/api/productos/:id', actualizarProducto);
router.delete('/api/productos/:id', eliminarProducto);

// Rutas para renderizar vistas y manejar formularios HTML
router.get('/manipularProductos', async (req, res) => {
    try {
        const productosDB = await cargarInventario();
        const productos = productosDB.map(prod => ({
            ID: prod.ID,
            nombre: prod.Nombre,
            precio: prod.Precio,
            categoria: prod.Categoria,
            stock: prod.Stock
        }));
        res.render('manipularProductos', { productos, error: null });
    } catch (err) {
        console.error('Error render /manipularProductos:', err);
        res.redirect('/');
    }
});

router.post('/manipularProductos/agregar', async (req, res) => {
    try {
        const { nombre, precio, categoryid, stock } = req.body;
        await crearProductoAdmin({
            nombre,
            precio: Number(precio),
            categoria: Number(categoryid),
            stock: Number(stock)
        });
        return res.redirect('/admin/manipularProductos');
    } catch (err) {
        console.error('Error POST /manipularProductos/agregar:', err);
        const productosDB = await cargarInventario();
        const productos = productosDB.map(prod => ({
            ID: prod.ID,
            nombre: prod.Nombre,
            precio: prod.Precio,
            categoria: prod.Categoria,
            stock: prod.Stock
        }));
        const message = err?.message || 'Error al agregar el producto';
        return res.status(400).render('manipularProductos', { productos, error: message });
    }
});

router.post('/manipularProductos/eliminar/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await eliminarProductoAdmin(id);
    } catch (err) {
        console.error('Error POST /manipularProductos/eliminar:', err);
    }
    res.redirect('/admin/manipularProductos');
});

router.get('/modificarProducto/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const prod = await obtenerProductoInventarioPorId(id);
        if (!prod) return res.redirect('/admin/manipularProductos');

        const producto = {
            ID: prod.ID,
            nombre: prod.Nombre,
            precio: prod.Precio,
            categoria: prod.Categoria,
            stock: prod.Stock
        };

        return res.render('modificarProductos', { producto });
    } catch (err) {
        console.error('Error render /modificarProducto:', err);
        return res.redirect('/admin/manipularProductos');
    }
});

router.post('/modificarProducto/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { nombre, precio, categoryid, stock } = req.body;
        await actualizarProductoAdmin(id, {
            nombre,
            precio: Number(precio),
            categoria: Number(categoryid),
            stock: Number(stock)
        });
    } catch (err) {
        console.error('Error POST /modificarProducto:', err);
    }
    return res.redirect('/admin/manipularProductos');
});

export default router;