const express = require('express')
const router = express.Router();
const cors = require('cors')
const controladorCategoria = require('../controladores/categoriaController')


router.post('/crear', controladorCategoria.crearCategoria);
router.get('/:id?', controladorCategoria.obtenerCategoria);
router.put('/:id?', controladorCategoria.actualizarCategoria);
router.delete('/:id', controladorCategoria.eliminarCategoria)
module.exports = router;