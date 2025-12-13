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
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({ error: 'Faltan datos requeridos' });
        }
        const result = await crearUsuario({ username, password, email });
        if (result.code === 'USER_EXISTS') {
            return res.status(409).json({ error: 'El nombre de usuario ya está en uso' });
        }
        if (result.code === 'EMAIL_EXISTS') {
            return res.status(409).json({ error: 'El correo electrónico ya está registrado en otra cuenta' });
        }
        if (result.message === 'Error al crear usuario') {
            return res.status(500).json({ error: 'No se pudo crear el usuario' });
        }
        res.status(201).json({ message: 'Usuario creado', id: result.id });
    } catch (error) {
        console.error('Error CreateUser:', error);
        res.status(500).json({ error: 'Error al crear usuario', details: error.message });
    }
}

// Obtener todos los usuarios
export async function getUsers(req, res) {
    try {
        const usuarios = await obtenerUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Error getUsers:', error);
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
        console.error('Error getUserById:', error);
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
        console.error('Error updateUser:', error);
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
        console.error('Error deleteUser:', error);
        res.status(500).json({ error: 'Error al eliminar usuario', details: error.message });
    }
}

export async function Loginuser(req, res) {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ success: false, error: 'Faltan datos requeridos' });
        }
        const usuario = await validarCredenciales(username, password);
        if (!usuario) {
            return res.status(401).json({ success: false, error: 'Credenciales inválidas' });
        }
        // No devolver la contraseña al cliente
        const safeUser = {
            ID: usuario.ID,
            UserName: usuario.UserName,
            Correo: usuario.Correo
        };
        res.status(200).json({ success: true, message: 'Login exitoso', usuario: safeUser });
    } catch (error) {
        console.error('Error Loginuser:', error);
        res.status(500).json({ success: false, error: 'Error al iniciar sesión', details: error.message });
    }
}