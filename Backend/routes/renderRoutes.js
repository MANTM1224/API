import { Router } from 'express';
import {
    actualizarUsuario,
    crearUsuario,
    obtenerUsuarioPorId,
    validarCredenciales
} from '../models/userModel.js';
import { EliminarProducto, TraerCarrito, VaciarCarrito } from '../models/CarritoModel.js';
import { obtenerVentasPorUsuario, registrarVenta } from '../models/ventasModel.js';
import { format } from 'date-fns';
import { AgregarAlCarrito } from '../models/CarritoModel.js';
import {
    actualizarProductoInventario,
    cargarInventario,
    crearProductoInventario,
    eliminarProductoInventario,
    obtenerProductoInventarioPorId
} from '../models/inventariomodel.js';

const router = Router();

router.get('/iniciarSs', (req, res) => {
    res.render('iniciarSs', { error: null, registered: false });
});

// Login SIN JavaScript (form POST)
router.post('/iniciarSs', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).render('iniciarSs', { error: 'Faltan datos requeridos', registered: false });
        }

        const usuario = await validarCredenciales(username, password);
        if (!usuario) {
            return res.status(401).render('iniciarSs', { error: 'Credenciales inválidas', registered: false });
        }

        return res.redirect(`/?usuarioID=${usuario.ID}`);
    } catch (err) {
        console.error('Error POST /iniciarSs:', err);
        return res.status(500).render('iniciarSs', { error: 'Error al iniciar sesión', registered: false });
    }
});

router.get('/crearAcc', (req, res) => {
    res.render('crearAcc', { error: null });
});

// Registro SIN JavaScript (form POST)
router.post('/crearAcc', async (req, res) => {
    try {
        const { username, password, email, confirmPassword } = req.body;
        if (!username || !password || !email) {
            return res.status(400).render('crearAcc', { error: 'Faltan datos requeridos' });
        }
        if (confirmPassword != null && password !== confirmPassword) {
            return res.status(400).render('crearAcc', { error: 'Las contraseñas no coinciden' });
        }

        const result = await crearUsuario({ username, password, email });
        if (result?.code === 'USER_EXISTS') {
            return res.status(409).render('crearAcc', { error: 'El nombre de usuario ya está en uso' });
        }
        if (result?.code === 'EMAIL_EXISTS') {
            return res.status(409).render('crearAcc', { error: 'El correo electrónico ya está registrado en otra cuenta' });
        }

        return res.render('iniciarSs', { error: null, registered: true });
    } catch (err) {
        console.error('Error POST /crearAcc:', err);
        return res.status(500).render('crearAcc', { error: 'Error al crear usuario' });
    }
});

// Mostrar página de cuenta
router.get('/cuenta/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await obtenerUsuarioPorId(id);
        if (!usuario) return res.redirect('/iniciarSs');
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
        if (!usuario) return res.redirect('/iniciarSs');
        res.render('editarCuenta', { usuario });
    } catch (err) {
        console.error('Error render /editarCuenta:', err);
        res.redirect('/');
    }
});

// Guardar cambios SIN JavaScript (form POST)
router.post('/editarCuenta/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { username, password, email, confirmPassword } = req.body;
        if (confirmPassword != null && password !== confirmPassword) {
            return res.redirect(`/editarCuenta/${id}`);
        }
        const actualizado = await actualizarUsuario(id, { username, password, email });
        if (!actualizado) return res.redirect('/iniciarSs');
        return res.redirect(`/cuenta/${id}`);
    } catch (err) {
        console.error('Error POST /editarCuenta:', err);
        return res.redirect(`/editarCuenta/${id}`);
    }
});

// Agregar al carrito SIN JavaScript (form POST)
router.post('/carrito/:usuarioID/agregar', async (req, res) => {
    const { usuarioID } = req.params;
    try {
        const { NombreProducto, cantidad } = req.body;
        const qty = Number.parseInt(String(cantidad ?? '1'), 10);
        if (!NombreProducto || Number.isNaN(qty) || qty <= 0) {
            return res.redirect(`/?usuarioID=${usuarioID}`);
        }
        await AgregarAlCarrito(usuarioID, NombreProducto, qty);
        return res.redirect(`/?usuarioID=${usuarioID}`);
    } catch (err) {
        console.error('Error POST /carrito/agregar:', err);
        return res.redirect(`/?usuarioID=${usuarioID}`);
    }
});

// Página de administrar inventario SIN JavaScript
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
        res.render('manipularProductos', { productos });
    } catch (err) {
        console.error('Error render /manipularProductos:', err);
        res.redirect('/');
    }
});

router.post('/manipularProductos/agregar', async (req, res) => {
    try {
        const { nombre, precio, categoryid, stock } = req.body;
        await crearProductoInventario({
            nombre,
            precio: Number(precio),
            categoria: categoryid,
            stock: Number(stock)
        });
    } catch (err) {
        console.error('Error POST /manipularProductos/agregar:', err);
    }
    res.redirect('/manipularProductos');
});

router.post('/manipularProductos/eliminar/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await eliminarProductoInventario(id);
    } catch (err) {
        console.error('Error POST /manipularProductos/eliminar:', err);
    }
    res.redirect('/manipularProductos');
});

// Editar producto (administrador)
router.get('/modificarProducto/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const prod = await obtenerProductoInventarioPorId(id);
        if (!prod) return res.redirect('/manipularProductos');

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
        return res.redirect('/manipularProductos');
    }
});

router.post('/modificarProducto/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { nombre, precio, categoryid, stock } = req.body;
        await actualizarProductoInventario(id, {
            nombre,
            precio: Number(precio),
            categoria: categoryid,
            stock: Number(stock)
        });
    } catch (err) {
        console.error('Error POST /modificarProducto:', err);
    }
    return res.redirect('/manipularProductos');
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

// Acciones del carrito SIN JavaScript (formularios)
router.post('/carrito/:usuarioID/eliminar/:carritoID', async (req, res) => {
    const { usuarioID, carritoID } = req.params;
    try {
        await EliminarProducto(carritoID, usuarioID);
    } catch (err) {
        console.error('Error POST /carrito/eliminar:', err);
    }
    res.redirect(`/carrito/${usuarioID}`);
});

router.post('/carrito/:usuarioID/vaciar', async (req, res) => {
    const { usuarioID } = req.params;
    try {
        await VaciarCarrito(usuarioID);
    } catch (err) {
        console.error('Error POST /carrito/vaciar:', err);
    }
    res.redirect(`/carrito/${usuarioID}`);
});

router.post('/carrito/:usuarioID/pagar', async (req, res) => {
    const { usuarioID } = req.params;
    try {
        const carritoResultado = await TraerCarrito(usuarioID);
        if (!carritoResultado?.success) return res.redirect(`/carrito/${usuarioID}`);

        const items = carritoResultado.data;
        if (!items || items.length === 0) return res.redirect(`/carrito/${usuarioID}`);

        const fecha = format(new Date(), 'yyyy-MM-dd');
        for (const item of items) {
            const productoNombre = item.Nombre || item.nombre;
            const cantidad = item.cantidad;
            const precio = item.Precio || item.precio || 0;
            const precio_total = (precio * cantidad);
            await registrarVenta({ usuario: usuarioID, fecha_de_compra: fecha, producto: productoNombre, cantidad, precio_total });
        }

        await VaciarCarrito(usuarioID);
        return res.redirect(`/historial/${usuarioID}`);
    } catch (err) {
        console.error('Error POST /carrito/pagar:', err);
        return res.redirect(`/carrito/${usuarioID}`);
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