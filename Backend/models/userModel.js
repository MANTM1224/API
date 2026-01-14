import db from '../config/dbconfig.js';

export async function crearUsuario({ username, password, email }) {
    // Validar si el usuario ya existe
    const sqlCheckUser = 'SELECT * FROM usuario WHERE UserName = ?';
    const [userRows] = await db.execute(sqlCheckUser, [username]);
    if (userRows.length > 0) {
        return { message: 'Usuario ya existe', code: 'USER_EXISTS' };
    }
    // Validar si el correo ya existe
    const sqlCheckEmail = 'SELECT * FROM usuario WHERE Correo = ?';
    const [emailRows] = await db.execute(sqlCheckEmail, [email]);
    if (emailRows.length > 0) {
        return { message: 'Correo ya registrado', code: 'EMAIL_EXISTS' };
    }
    // Insertar usuario si no existe ni el username ni el correo
    const sql = 'INSERT INTO usuario (UserName, Contraseña, Correo) VALUES (?, ?, ?)';
    const [result] = await db.execute(sql, [username, password, email]);
    return { message: 'Usuario creado', id: result.insertId };
}

export async function buscarUsuarioPorUsername(username) {
    const sql = 'SELECT * FROM usuario WHERE UserName = ?';
    const [rows] = await db.execute(sql, [username]);
    return rows[0];
}

export async function validarCredenciales(username, password) {
    const sql = 'SELECT * FROM usuario WHERE UserName = ? AND Contraseña = ?';
    const [rows] = await db.execute(sql, [username, password]);
    console.log('ValidarCredenciales result:', rows);
    return rows[0];
}

// CRUD de usuario
export async function obtenerUsuarios() {
    const sql = 'SELECT * FROM usuario';
    const [rows] = await db.execute(sql);
    return rows;
}

export async function obtenerUsuarioPorId(id) {
    const sql = 'SELECT * FROM usuario WHERE ID = ?';
    const [rows] = await db.execute(sql, [id]);
    return rows[0];
}

export async function actualizarUsuario(id, { username, password, email }) {
    const sql = 'UPDATE usuario SET UserName = ?, Contraseña = ?, Correo = ? WHERE ID = ?';
    const [result] = await db.execute(sql, [username, password, email, id]);
    return result.affectedRows > 0;
}

export async function eliminarUsuario(id) {
    const sql = 'DELETE FROM usuario WHERE ID = ?';
    const [result] = await db.execute(sql, [id]);
    return result.affectedRows > 0;
}
