import {
    crearProductoAdmin,
    actualizarProductoAdmin,
    eliminarProductoAdmin
} from '../models/adminModel.js';

export async function crearProducto(req, res) {
    try {
        const { nombre, precio, categoria, stock } = req.body;
        const nuevoProductoId = await crearProductoAdmin({ nombre, precio, categoria, stock });
        res.status(201).json({ message: 'Producto creado exitosamente', id: nuevoProductoId });
    } catch (error) {
        console.error('Error al crear el producto:', error);
        if (error.message.includes('categoría')) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}

export async function actualizarProducto(req, res) {
    try {
        const { id } = req.params;
        const { nombre, precio, categoria, stock } = req.body;
        const exito = await actualizarProductoAdmin(id, { nombre, precio, categoria, stock });
        if (exito) {
            res.status(200).json({ message: 'Producto actualizado exitosamente' });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        if (error.message.includes('categoría')) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}

export async function eliminarProducto(req, res) {
    try {
        const { id } = req.params;
        const exito = await eliminarProductoAdmin(id);
        if (exito) {
            res.status(200).json({ message: 'Producto eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}