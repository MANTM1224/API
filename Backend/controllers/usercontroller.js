import { crearUsuario, validarCredenciales } from '../models/userModel.js';

export async function CreateUser(req, res) {
    try {
        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            return res.status(400).json({ error: 'Faltan datos requeridos' });
        }
        const id = await crearUsuario({ username, password, email });
        res.status(201).json({ message: 'Usuario creado', id });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear usuario', details: error.message });
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