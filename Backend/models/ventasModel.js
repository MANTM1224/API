import db from '../config/dbconfig.js';

export async function registrarVenta({ id, usuario, fecha, producto, cantidad, precioTotal }) {
    const sql = 'INSERT INTO ventas (ID, usuario, `fecha de compra`, producto, cantidad, `precio total`) VALUES (?, ?, ?, ?, ?, ?)';
    const [result] = await db.execute(sql, [id, usuario, fecha, producto, cantidad, precioTotal]);
    return result.insertId;
}

export async function obtenerVentasPorUsuario(usuario) {
    const sql = 'SELECT * FROM ventas WHERE usuario = ?';
    const [rows] = await db.execute(sql, [usuario]);
    return rows;
}
