import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import ejs from 'ejs';
//aqui nosotros tenemos que agregar las rutas que se van a consumir



import inventarioroutes from './routes/inventarioroutes.js';
import userRoutes from './routes/userRoutes.js';
import renderRoutes from './routes/renderRoutes.js';
import carritoRoutes from './routes/carritoroutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = path.resolve(); // Obtener el directorio actual

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../Frontend', 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../Frontend', 'views'));
console.log(path.join(__dirname, '../Frontend', 'views'));
app.use('/css', express.static(path.join(__dirname, '../Frontend/public/css')));

// Registrar rutas de la API antes del handler de vistas



app.use('/', renderRoutes);
app.use('/user', userRoutes);
app.use('/api/carrito', carritoRoutes);
app.use('/admin', adminRoutes);

//vamos a consumir las rutas (página principal)
app.use('/', inventarioroutes);


    

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});