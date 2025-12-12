
import { AgregarAlCarrito, VaciarCarrito, EliminarProducto, TraerCarrito } from '../models/CarritoModel.js';
async function agregarArticulos(req, res) {
    console.log('Parametros recibidos:', req.params);
    const { usuarioID, NombreProducto, cantidad } = req.params;
    if (!usuarioID || !NombreProducto || !cantidad) {
        return res.status(400).json({ success: false, message: 'Faltan parametros' });
    }
    if (isNaN(cantidad) || parseInt(cantidad) <= 0) {
        return res.status(400).json({ success: false, message: 'Cantidad invalida' });
    }
    const resultado = await AgregarAlCarrito(usuarioID, NombreProducto, parseInt(cantidad));
    res.status(200).json(resultado);
}
<<<<<<< HEAD
=======


>>>>>>> 962d933d420f6f71e7c4aed2038ab931664194e4
// Implementación de las funciones faltantes y manejo de errores
async function vaciarCarrito(req, res) {
    try {
        const { usuarioID } = req.params;
        if (!usuarioID) return res.status(400).json({ success: false, message: 'Falta usuarioID' });

        const resultado = await VaciarCarrito(usuarioID);
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
        if (!carritoID || !usuarioID) return res.status(400).json({ success: false, message: 'Faltan parametros' });

        const resultado = await EliminarProducto(carritoID, usuarioID);
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
        if (!resultado) return res.status(500).json({ success: false, message: 'No se obtuvo respuesta del modelo' });
        return res.status(200).json(resultado);
    } catch (err) {
        console.error('Error en TraerCarrito:', err);
        return res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
}

export { agregarArticulos, vaciarCarrito, eliminarProducto, traerCarrito };