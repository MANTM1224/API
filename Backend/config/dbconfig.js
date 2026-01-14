import mysql from 'mysql2';
import dotenv from 'dotenv';

//si vamos a tener una bd en servidor
//import {fileURLToPath} from 'url';

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

//dotenv.config({path: path.resolve(__dirname, '../.env')});
dotenv.config();

const pool = mysql.createPool({

    host: 'localhost',
    user: 'root',
    password: 'torresmanuel1.',
    database: 'api',

    //connectionLimit : 10,
    //acquireTimeout : 30000,
    //idleTimeout : 30000,
});

pool.getConnection((err, connection) => {
    if (err) {
        console.log('Error de conexion a la base de datos', err);
        return;
    }
    console.log('Conexion exitosa a la base de datos');
    connection.release();
});

// Exportar la versión con promesas por defecto
export default pool.promise();