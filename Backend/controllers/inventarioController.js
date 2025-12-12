import { cargarInventario } from '../models/inventariomodel.js';
import { TraerCarrito } from '../models/CarritoModel.js';
import { obtenerUsuarioPorId } from '../models/userModel.js';

export const getInventario = async (req, res) => {
    try {
        const productosDB = await cargarInventario();
        // Map database columns to view expected properties
        const productos = productosDB.map(prod => ({
            id: prod.ID,
            nombre: prod.Nombre,
            precio: prod.Precio,
            categoria: prod.Categoria,
            stock: prod.Stock
        }));
        // Obtener usuarioID desde sessionStorage o parámetro si existe
        const usuarioID = req.query.usuarioID ; // Por defecto 1 si no hay sesión
        res.render('main', { productos, usuarioID });
    } catch (error) {
        console.error("Error al cargar inventario:", error);
        res.status(500).send("Error interno del servidor");
    }
};

export const renderCarrito = async (req, res) => {
    try {
        const { usuarioID } = req.params;
        const carritoData = await TraerCarrito(usuarioID);
        const carrito = carritoData.success ? carritoData.productos : [];
        res.render('carrito', { carrito, usuarioID });
    } catch (error) {
        console.error("Error al cargar carrito:", error);
        res.status(500).send("Error interno del servidor");
    }
};

export const renderCuenta = async (req, res) => {
    try {
        const { usuarioID } = req.params;
        const usuario = await obtenerUsuarioPorId(usuarioID);
        if (!usuario) {
            return res.status(404).send("Usuario no encontrado");
        }
        res.render('cuenta', { usuario });
    } catch (error) {
        console.error("Error al cargar cuenta:", error);
        res.status(500).send("Error interno del servidor");
    }
};

export const renderEditarCuenta = async (req, res) => {
    try {
        const { usuarioID } = req.params;
        const usuario = await obtenerUsuarioPorId(usuarioID);
        if (!usuario) {
            return res.status(404).send("Usuario no encontrado");
        }
        res.render('editarCuenta', { usuario });
    } catch (error) {
        console.error("Error al cargar editar cuenta:", error);
        res.status(500).send("Error interno del servidor");
    }
};

export const renderCrearAcc = (req, res) => {
    res.render('crearAcc');
};

export const renderIniciarSs = (req, res) => {
    res.render('iniciarSs');
};

export const renderManipularProductos = async (req, res) => {
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
    } catch (error) {
        console.error("Error al cargar productos:", error);
        res.status(500).send("Error interno del servidor");
    }
};

export const renderHistorial = async (req, res) => {
    try {
        const { usuarioID } = req.params;
        // Por ahora renderiza la vista vacía. Puedes agregar la lógica de historial más tarde
        res.render('historial', { usuarioID, ventas: [] });
    } catch (error) {
        console.error("Error al cargar historial:", error);
        res.status(500).send("Error interno del servidor");
    }
};

