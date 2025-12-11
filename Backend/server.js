import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import ejs from 'ejs';
//aqui nosotros tenemos que agregar las rutas que se van a consumir
import productroutes from './routes/productroutes.js';


const app = express();
const PORT = process.env.PORT || 3000;  

const __dirname = path.resolve(); // Obtener el directorio actual

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname,  '../Frontend', 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../Frontend', 'views'));
console.log(path.join(__dirname, '../Frontend', 'views'));
app.use('/css', express.static(path.join(__dirname, '../Frontend/public/css')));


//vamos a consumir las rutas
app.use('/',(req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend', 'views', 'bienvenida.html'));
} 

    
);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});