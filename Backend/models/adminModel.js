import db from "../config/dbconfig.js";
import { cargarInventario, obtenerProductoInventarioPorId } from "./inventariomodel.js";

// Reutilizar funciones de inventariomodel para consultas
export { cargarInventario, obtenerProductoInventarioPorId };

// Función para crear producto con validación de categoría
export async function crearProductoAdmin({ nombre, precio, categoria, stock }) {
    // Verificar si la categoría existe
    const checkCategoriaQuery = 'SELECT ID FROM categoria WHERE ID = ?';
    const [categoriaRows] = await db.execute(checkCategoriaQuery, [categoria]);
    
    if (categoriaRows.length === 0) {
        throw new Error(`La categoría con ID ${categoria} no existe`);
    }
    
    const query = 'INSERT INTO inventario (Nombre, Precio, Categoria, Stock) VALUES (?, ?, ?, ?)';
    const params = [nombre, precio, categoria, stock];
    const [result] = await db.execute(query, params);
    return result.insertId;
}

// Función para actualizar producto con validación de categoría
export async function actualizarProductoAdmin(id, { nombre, precio, categoria, stock }) {
    // Verificar si la categoría existe
    const checkCategoriaQuery = 'SELECT ID FROM categoria WHERE ID = ?';
    const [categoriaRows] = await db.execute(checkCategoriaQuery, [categoria]);
    
    if (categoriaRows.length === 0) {
        throw new Error(`La categoría con ID ${categoria} no existe`);
    }
    
    const query = 'UPDATE inventario SET Nombre = ?, Precio = ?, Categoria = ?, Stock = ? WHERE ID = ?';
    const params = [nombre, precio, categoria, stock, id];
    const [result] = await db.execute(query, params);
    return result.affectedRows > 0;
}

// Función para eliminar producto y sus referencias
export async function eliminarProductoAdmin(id) {
    // Primero eliminar todas las referencias en el carrito
    const deleteCarritoQuery = 'DELETE FROM carrito WHERE producto = ?';
    await db.execute(deleteCarritoQuery, [id]);
    
    // Luego eliminar el producto del inventario
    const query = 'DELETE FROM inventario WHERE ID = ?';
    const [result] = await db.execute(query, [id]);
    return result.affectedRows > 0;
}
