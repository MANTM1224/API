
import sql from '../config/dbconfig.js';

async function queryAsync(query, params = []) {
    // Con pool.promise(), sql.query devuelve una promesa que resuelve [rows, fields]
    const [rows] = await sql.query(query, params);
    return rows;
}

async function AgregarAlCarrito(usuarioID, NombreProducto, cantidad) {
    try {
        const products = await queryAsync('SELECT * FROM inventario WHERE Nombre = ? LIMIT 1', [NombreProducto]);
        const producto = products[0];
        if (!producto) return { success: false, message: 'Producto no encontrado' };
        if (producto.stock < cantidad) return { success: false, message: 'Cantidad insuficiente en inventario' };
        const cantidadRegex = /^(?:[1-9][0-9]{0,2}|1000)$/;
        if (!cantidadRegex.test(String(cantidad))) return { success: false, message: 'Cantidad inválida. Debe ser un número entre 1 y 1000.' };

        const users = await queryAsync('SELECT * FROM usuario WHERE ID = ? LIMIT 1', [usuarioID]);
        const user = users[0];
        if (!user) return { success: false, message: 'Usuario no encontrado' };

        const total = producto.Precio * cantidad;
        await queryAsync('INSERT INTO carrito (usuario, producto, cantidad, total) VALUES (?, ?, ?, ?)', [user.ID, producto.ID, cantidad, total]);
        await queryAsync('UPDATE inventario SET stock = stock - ? WHERE ID = ?', [cantidad, producto.ID]);

        return { success: true, message: 'Producto agregado al carrito exitosamente' };
    } catch (err) {
        console.error('Error AgregarAlCarrito:', err);
        return { success: false, message: 'Error al agregar el producto al carrito' };
    }
}

async function TraerCarrito(UsuarioID) {
    try {
        const results = await queryAsync('SELECT c.ID, i.Nombre, i.Precio, c.cantidad FROM carrito c JOIN inventario i ON c.producto = i.ID WHERE c.usuario = ?', [UsuarioID]);
        return { success: true, data: results };
    } catch (err) {
        console.error('Error TraerCarrito:', err);
        return { success: false, message: 'Error al obtener el carrito' };
    }
}

async function EliminarProducto(carritoID, usuarioID) {
    try {
        await queryAsync('UPDATE carrito SET cantidad = cantidad - 1 WHERE ID = ? AND usuario = ?', [carritoID, usuarioID]);
        await queryAsync('UPDATE inventario SET stock = stock + 1 WHERE ID = (SELECT producto FROM carrito WHERE ID = ?)', [carritoID]);
        return { success: true, message: 'Producto eliminado del carrito exitosamente' };
    } catch (err) {
        console.error('Error EliminarProducto:', err);
        return { success: false, message: 'Error al eliminar el producto del carrito' };
    }
}

async function VaciarCarrito(UsuarioID) {
    try {
        await queryAsync('DELETE FROM carrito WHERE usuario = ?', [UsuarioID]);
        return { success: true, message: 'Carrito vaciado exitosamente' };
    } catch (err) {
        console.error('Error VaciarCarrito:', err);
        return { success: false, message: 'Error al vaciar el carrito' };
    }
}

export { AgregarAlCarrito, TraerCarrito, EliminarProducto, VaciarCarrito };