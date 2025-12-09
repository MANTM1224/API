//Los quiero mucho amigos este es mi ultimo acto de amor hacia ustedes
import express from 'express';
import path from 'path';

// Rutas que se van a consumir 

const app = require('express')();
const PORT = process.env.PORT || 3000;      
app.use(express.json());

//Comenzar el servidor

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
