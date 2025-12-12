import {
    crearUsuario,
    validarCredenciales,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario
} from '../models/userModel.js';

export async function CreateUser(req, res) {
    try {
        const { username, password, email } = req.params;
        console.log(req.params);
        if (!username || !password || !email) {
            return res.status(400).json({ error: 'Faltan datos requeridos' });
        }
        const id = await crearUsuario({ username, password, email });
        res.status(201).json({ message: 'Usuario creado', id });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear usuario', details: error.message });
    }
}

// Obtener todos los usuarios
export async function getUsers(req, res) {
    try {
        const usuarios = await obtenerUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios', details: error.message });
    }
}

// Obtener usuario por ID
export async function getUserById(req, res) {
    try {
        const { id } = req.params;
        const usuario = await obtenerUsuarioPorId(id);
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuario', details: error.message });
    }
}

// Actualizar usuario
export async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { username, password, email } = req.body;
        const actualizado = await actualizarUsuario(id, { username, password, email });
        if (!actualizado) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.status(200).json({ message: 'Usuario actualizado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar usuario', details: error.message });
    }
}

// Eliminar usuario
export async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        const eliminado = await eliminarUsuario(id);
        if (!eliminado) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar usuario', details: error.message });
    }
}

export async function Loginuser(req, res) {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Faltan datos requeridos' });
        }
        const usuario = await validarCredenciales(username, password);
        if (!usuario) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        res.status(200).json({ message: 'Login exitoso', usuario });
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión', details: error.message });
    }
}