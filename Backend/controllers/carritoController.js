import * as carrito from '../models/CarritoModel.js'

import { AgregarAlCarrito, VaciarCarrito, EliminarProducto, TraerCarrito } from '../models/CarritoModel.js';
import { registrarVenta } from '../models/ventasModel.js';
import { format } from 'date-fns';
async function agregarArticulos(req, res) {
    try {
        console.log('Parametros recibidos:', req.params);
        const { usuarioID, NombreProducto, cantidad } = req.params;
        if (!usuarioID || !NombreProducto || !cantidad) {
            return res.status(400).json({ success: false, message: 'Faltan parametros' });
        }
        const qty = parseInt(cantidad);
        if (isNaN(qty) || qty <= 0) {
            return res.status(400).json({ success: false, message: 'Cantidad invalida' });
        }
        const resultado = await AgregarAlCarrito(usuarioID, NombreProducto, qty);
        return res.status(200).json(resultado);
    } catch (err) {
        console.error('Error agregarArticulos:', err);
        return res.status(500).json({ success: false, message: 'Error interno al agregar al carrito' });
    }
}


// Implementación de las funciones faltantes y manejo de errores
async function vaciarCarrito(req, res) {
    try {
        const { usuarioID } = req.params;
        if (!usuarioID) return res.status(400).json({ success: false, message: 'Falta usuarioID' });

        const resultado = await VaciarCarrito(usuarioID);

        console.log('Resultado de VaciarCarrito:', resultado);
        if (!resultado) return res.status(500).json({ success: false, message: 'No se obtuvo respuesta del modelo' });
        return res.status(200).json(resultado);
    } catch (err) {
        console.error('Error en VaciarCarrito:', err);
        return res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
}

async function eliminarProducto(req, res) {
    try {
        const { carritoID, usuarioID } = req.params;
        console.log('Parametros recibidos en eliminarProducto:', { carritoID, usuarioID });
        if (!carritoID || !usuarioID) return res.status(400).json({ success: false, message: 'Faltan parametros' });

        const resultado = await EliminarProducto(carritoID, usuarioID);

        console.log('Resultado de EliminarProducto:', resultado);
        if (!resultado) return res.status(500).json({ success: false, message: 'No se obtuvo respuesta del modelo' });
        return res.status(200).json(resultado);
    } catch (err) {
        console.error('Error en EliminarProducto:', err);
        return res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
}

async function traerCarrito(req, res) {
    try {
        const { usuarioID } = req.params;
        if (!usuarioID) return res.status(400).json({ success: false, message: 'Falta usuarioID' });

        const resultado = await TraerCarrito(usuarioID);
        console.log('Resultado de TraerCarrito:', resultado);
        if (!resultado) return res.status(500).json({ success: false, message: 'No se obtuvo respuesta del modelo' });
        return res.status(200).json(resultado);
    } catch (err) {
        console.error('Error en TraerCarrito:', err);
        return res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
}

// Procesar pago: registrar ventas por cada item y vaciar carrito
async function procesarPago(req, res) {
    try {
        const { usuarioID } = req.params;
        if (!usuarioID) return res.status(400).json({ success: false, message: 'Falta usuarioID' });

        const carritoResultado = await TraerCarrito(usuarioID);
        if (!carritoResultado.success) return res.status(500).json({ success: false, message: 'No se pudo obtener carrito' });
        const items = carritoResultado.data;
        if (!items || items.length === 0) return res.status(400).json({ success: false, message: 'Carrito vacío' });

        const fecha = format(new Date(), 'yyyy-MM-dd');
        for (const item of items) {
            const productoNombre = item.Nombre || item.nombre;
            const cantidad = item.cantidad;
            const precio = item.Precio || item.precio || 0;
            const precio_total = (precio * cantidad);
            await registrarVenta({ usuario: usuarioID, fecha_de_compra: fecha, producto: productoNombre, cantidad, precio_total });
        }

        // Vaciar carrito
        await VaciarCarrito(usuarioID);
        return res.status(200).json({ success: true, message: 'Pago procesado y ventas registradas' });
    } catch (err) {
        console.error('Error procesarPago:', err);
        return res.status(500).json({ success: false, message: 'Error al procesar pago' });
    }
}

export { agregarArticulos, vaciarCarrito, eliminarProducto, traerCarrito, procesarPago };