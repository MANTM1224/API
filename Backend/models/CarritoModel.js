
import sql from '../config/dbconfig';
async function AgregarAlCarrito(usuarioID, NombreProducto, cantidad) {

    const obtenerProducto = async (NombreProducto) => {
        return new Promise((resolve, reject) => {
            sql.query(
                'SELECT * FROM inventario WHERE Nombre= ? limit 1',
                [NombreProducto],
                (err, results) => {
                    if (err) {
                        console.error(err);
                        return reject(err);
                    }
                    const resultado = results[0];

                    console.log('Resultado de la consulta:', resultado); // Debug

                    if (!resultado) {
                        return resolve({ success: false, message: 'Producto no encontrado' });
                    }

                    if (resultado.stock < cantidad) {
                        return resolve({ success: false, message: 'Cantidad insuficiente en inventario' });
                    }
                    // Validar cantidad con expresión regular
                    const cantidadRegex = /^(?:[1-9][0-9]{0,2}|1000)$/;

                    if (!cantidadRegex.test(String(cantidad))) {
                        return resolve({ success: false, message: 'Cantidad inválida. Debe ser un número entre 1 y 1000.' });
                    }

                    return resolve({ success: true, message: null, ID: resultado.ID, Precio: resultado.Precio });
                }
            );
        });
    };
    const obtenerIDUsuario = async (usuarioID) => {
        return new Promise((resolve, reject) => {

            sql.query('SELECT * FROM usuario WHERE usuarioID= ? limit 1', [usuarioID], (err, results) => {
                if (err) {
                    console.error(err);
                    return reject(err);
                }
                const resultado = results[0];

                console.log('Resultado de la consulta ID Usuario:', resultado); // Debug
                if (!resultado) {
                    return resolve({ success: false, message: 'Usuario no encontrado' });
                }
                return resolve({ success: true, message: null, ID: resultado.ID });
            });
        });
    }
    const agregarCarritoQuery = async (usuarioID, Producto, total) => {
        console.log('Producto encontrado:', product); // Debug 
        const querry = 'INSERT INTO carrito (usuario, producto, cantidad, total) VALUES (?, ?, ?, ?)';
        sql.query(querry, [usuarioID.ID, Producto.ID, cantidad, total], (err, res) => {
            if (err) {
                return { success: false, message: 'Error al agregar el producto al carrito' };
            }
            return { success: true, message: 'Producto agregado al carrito exitosamente' };
        })

        const restarStockQuery = 'UPDATE inventario SET stock = stock - ? WHERE ID = ?';
        sql.query(restarStockQuery, [cantidad, product.ID]);
    }
    const userID = await obtenerIDUsuario(usuarioID);

       if (!userID.success) {
        return { success: false, message: userID.message };
    }

    const product = await obtenerProducto(NombreProducto);

 
    if (!product.success) {
        return { success: false, message: product.message };
    }
    const total = product.Precio * cantidad;
    const { success, message } = await agregarCarritoQuery(userID, product, total);

    if (!success) {
        return { success: false, message: message };
    }
    return { success: true, message: 'Producto agregado al carrito exitosamente' };


}

async function TraerCarrito(UsuarioID) {
    const querry = 'SELECT c.ID, i.Nombre, i.Precio, c.cantidad FROM carrito c JOIN inventario i ON c.producto = i.ID WHERE c.usuario = ?';
    sql.query(querry, [UsuarioID], (err, results) => {
        if (err) {
            console.error('Error al obtener el carrito:', err);
            return { success: false, message: 'Error al obtener el carrito' };
        }
        console.log('Carrito obtenido:', results); // Debug
        return { success: true, data: results };
    });
}



async function EliminarProducto(carritoID, usuarioID) {
    const querry = 'UPDATE carrito SET cantidad = cantidad - 1 WHERE ID = ? AND usuario = ?';
    sql.query(querry, [carritoID, usuarioID], (err, results) => {
        if (err) {
            console.error('Error al eliminar el producto del carrito:', err);
            return { success: false, message: 'Error al eliminar el producto del carrito' };
        }
   const restarStockQuery = 'UPDATE inventario SET stock = stock + 1 WHERE ID = (SELECT producto FROM carrito WHERE ID = ?)';
    sql.query(restarStockQuery, [carritoID]);
    
     return { success: true, message: 'Producto eliminado del carrito exitosamente' };
    });
}

async function VaciarCarrito(UsuarioID) {
    const querry = 'DELETE FROM carrito WHERE usuario = ?';
    sql.query(querry, [UsuarioID], (err, results) => {
        if (err) {
            console.error('Error al vaciar el carrito:', err);
            return { success: false, message: 'Error al vaciar el carrito' };
        }
        console.log('Carrito vaciado para el usuario ID:', UsuarioID); // Debug
        return { success: true, message: 'Carrito vaciado exitosamente' };
    });
}

export { AgregarAlCarrito, TraerCarrito, EliminarProducto, VaciarCarrito };