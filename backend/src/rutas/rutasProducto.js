const express = require('express')
const cors = require('cors');
const router = express.Router();
const controladorProducto = require('../controladores/productoController');


router.post('/crear', controladorProducto.crearProducto)
router.get('/:id?', controladorProducto.obtenerProducto)
router.put('/:id?', controladorProducto.actualizarProducto)
router.delete('/:id?', controladorProducto.eliminarProducto)
module.exports = router;