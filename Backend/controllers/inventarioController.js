import { cargarInventario } from '../models/inventariomodel.js';

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
        res.render('main', { productos });
    } catch (error) {
        console.error("Error al cargar inventario:", error);
        res.status(500).send("Error interno del servidor");
    }
};