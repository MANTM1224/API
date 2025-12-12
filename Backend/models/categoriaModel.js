import db from '../config/dbconfig.js';

export async function crearCategoria({ id, nombre }) {
    const sql = 'INSERT INTO categoria (ID, Nombre) VALUES (?, ?)';
    const [result] = await db.execute(sql, [id, nombre]);
    return result.insertId;
}

export async function obtenerCategorias() {
    const sql = 'SELECT * FROM categoria';
    const [rows] = await db.execute(sql);
    return rows;
}

export async function obtenerCategoriaPorId(id) {
    const sql = 'SELECT * FROM categoria WHERE ID = ?';
    const [rows] = await db.execute(sql, [id]);
    return rows[0];
}

export async function actualizarCategoria(id, nombre) {
    const sql = 'UPDATE categoria SET Nombre = ? WHERE ID = ?';
    const [result] = await db.execute(sql, [nombre, id]);
    return result.affectedRows > 0;
}

export async function eliminarCategoria(id) {
    const sql = 'DELETE FROM categoria WHERE ID = ?';
    const [result] = await db.execute(sql, [id]);
    return result.affectedRows > 0;
}
