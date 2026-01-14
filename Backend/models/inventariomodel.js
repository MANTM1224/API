import db from "../config/dbconfig.js";

export async function cargarInventario() {
    const query = "SELECT * FROM inventario";
    // db es pool.promise(), por lo que query devuelve [rows, fields]
    const [rows] = await db.query(query);
    return rows;
}

export async function crearProductoInventario({ nombre, precio, categoria, stock }) {
    const query = 'INSERT INTO inventario (Nombre, Precio, Categoria, Stock) VALUES (?, ?, ?, ?)';
    const params = [nombre, precio, categoria, stock];
    const [result] = await db.execute(query, params);
    return result.insertId;
}

export async function eliminarProductoInventario(id) {
    const query = 'DELETE FROM inventario WHERE ID = ?';
    const [result] = await db.execute(query, [id]);
    return result.affectedRows > 0;
}