import db from '../config/dbconfig.js';

export async function crearUsuario({ username, password, email }) {
    const sql = 'INSERT INTO usuario (UserName, Contraseña, Correo) VALUES (?, ?, ?)';
    const [result] = await db.execute(sql, [username, password, email]);
    return result.insertId;
}

export async function buscarUsuarioPorUsername(username) {
    const sql = 'SELECT * FROM usuario WHERE UserName = ?';
    const [rows] = await db.execute(sql, [username]);
    return rows[0];
}

export async function validarCredenciales(username, password) {
    const sql = 'SELECT * FROM usuario WHERE UserName = ? AND Contraseña = ?';
    const [rows] = await db.execute(sql, [username, password]);
    return rows[0];
}
