import carrito from '../models/CarritoModel'

async function agregarArticulos(req,res) {
    console.log('Parametros recibidos:', req.params);

    const { usuarioID, NombreProducto, cantidad } = req.params;
    if (!usuarioID || !NombreProducto || !cantidad) {
        return res.status(400).json({ success: false, message: 'Faltan parametros' });
    }
    if (isNaN(cantidad) || parseInt(cantidad) <= 0) {
        return res.status(400).json({ success: false, message: 'Cantidad invalida' });
    }
    const resultado = await carrito.AgregarAlCarrito(usuarioID, NombreProducto, parseInt(cantidad));
    res.status(200).json(resultado);

}


// Implementación de las funciones faltantes y manejo de errores
async function VaciarCarrito(req, res) {
    try {
        const { usuarioID } = req.params;
        if (!usuarioID) return res.status(400).json({ success: false, message: 'Falta usuarioID' });

        const resultado = await carrito.VaciarCarrito(usuarioID);
        if (!resultado) return res.status(500).json({ success: false, message: 'No se obtuvo respuesta del modelo' });
        return res.status(200).json(resultado);
    } catch (err) {
        console.error('Error en VaciarCarrito:', err);
        return res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
}

async function EliminarProducto(req, res) {
    try {
        const { carritoID, usuarioID } = req.params;
        if (!carritoID || !usuarioID) return res.status(400).json({ success: false, message: 'Faltan parametros' });

        const resultado = await carrito.EliminarProducto(carritoID, usuarioID);
        if (!resultado) return res.status(500).json({ success: false, message: 'No se obtuvo respuesta del modelo' });
        return res.status(200).json(resultado);
    } catch (err) {
        console.error('Error en EliminarProducto:', err);
        return res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
}

async function TraerCarrito(req, res) {
    try {
        const { usuarioID } = req.params;
        if (!usuarioID) return res.status(400).json({ success: false, message: 'Falta usuarioID' });

        const resultado = await carrito.TraerCarrito(usuarioID);
        if (!resultado) return res.status(500).json({ success: false, message: 'No se obtuvo respuesta del modelo' });
        return res.status(200).json(resultado);
    } catch (err) {
        console.error('Error en TraerCarrito:', err);
        return res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
}

export { agregarArticulos, VaciarCarrito, EliminarProducto, TraerCarrito };