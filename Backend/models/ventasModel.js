import db from '../config/dbconfig.js';

export async function registrarVenta({ usuario, fecha_de_compra, producto, cantidad, precio_total }) {
    // Insertar sin ID (asumiendo que la tabla usa AUTO_INCREMENT)
    const sql = 'INSERT INTO ventas (usuario, fecha_de_compra, producto, cantidad, precio_total) VALUES (?, ?, ?, ?, ?)';
    const [result] = await db.execute(sql, [usuario, fecha_de_compra, producto, cantidad, precio_total]);
    return result.insertId;
}

export async function obtenerVentasPorUsuario(usuario) {
    const sql = 'SELECT * FROM ventas WHERE usuario = ? ORDER BY fecha_de_compra DESC';
    const [rows] = await db.execute(sql, [usuario]);
    return rows;
}
