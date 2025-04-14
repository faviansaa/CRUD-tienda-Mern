const express = require('express')
const cors = require('cors');
const router = express.Router();
const controladorProducto = require('../controladores/productoController');
const middlewareAutenticacion = require('../middleware/middlewareAutenticacion')

router.post('/crear', middlewareAutenticacion , controladorProducto.crearProducto);
router.get('/:id?',middlewareAutenticacion, controladorProducto.obtenerProducto);
router.put('/:id?',middlewareAutenticacion, controladorProducto.actualizarProducto);
router.delete('/:id?',middlewareAutenticacion, controladorProducto.eliminarProducto);
module.exports = router;