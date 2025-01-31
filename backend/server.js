const express = require('express');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
const cors = require('cors');

const connectBD = require('./src/configuracion/bd');

const rutasUsuario =require('./src/rutas/rutasUsuario')
const rutasProducto = require('./src/rutas/rutasProducto')
const rutasCategoria = require('./src/rutas/rutasCategoria')


require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(cors());

connectBD();

app.get('/' ,(req,res)=> res.send('Api funcionando '))

app.use('/api/usuario', rutasUsuario)
app.use('/api/producto', rutasProducto )
app.use('/api/categoria', rutasCategoria)


// Middleware respuetas json
app.use((req,res,next)=>{
    res.status(404).json({mensaje: 'Ruta no encontrada :( '});
});

app.use((req,res,next)=>{
    console.error(error.stack)
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
});

app.listen(PORT, ()=> console.log(`Servidor corriendo en http://localhost:${PORT}`))