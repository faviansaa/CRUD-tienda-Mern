const express = require('express')
const router = express.Router();
const cors = require('cors')
const controladorCategoria = require('../controladores/categoriaController')
const middlewareAutenticacion = require('../middleware/middlewareAutenticacion')

router.post('/crear',middlewareAutenticacion, controladorCategoria.crearCategoria);
router.get('/:id?',middlewareAutenticacion, controladorCategoria.obtenerCategoria);
router.put('/:id?',middlewareAutenticacion, controladorCategoria.actualizarCategoria);
router.delete('/:id?',middlewareAutenticacion, controladorCategoria.eliminarCategoria);
module.exports = router;