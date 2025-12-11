
import sql from '../config/dbconfig';
async function AgregarAlCarrito(params) {
sql.query(
    'SELECT * FROM inventario WHERE Nombre= ? ',
    [NombreProducto],
    (err, results) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(results);
    }
);
    
}
   try{
        bdConecction.query('SELECT * FROM cursos', (error, results) => {
            if (error) {
                return res.status(400).json({ message: 'Error al obtener los cursos' });
                console.log(error);
            } else {
                res.status(200).json(results);    
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }