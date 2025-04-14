const cors = require('cors');
const express = require ('express');
const router = express.Router();
const controladorUsuario = require('../controladores/usuarioController');
const middlewareAutenticacion = require('../middleware/middlewareAutenticacion')
//Rutas Usuario

router.post('/auth/registrar', controladorUsuario.registrarUsuario); // Registro de usuario
router.post('/auth/iniciarSesion', controladorUsuario.IniciarSesion); // Inicio de sesión


router.get('/perfil', middlewareAutenticacion, controladorUsuario.obtenerPerfilUsuario);
router.put('/perfil', middlewareAutenticacion, controladorUsuario.actualizarPerfilUsuario);
router.get('/:id?', middlewareAutenticacion,controladorUsuario.obtenerPerfilUsuario);
router.put('/actualizar/:id?',middlewareAutenticacion, controladorUsuario.actualizarPerfilUsuario);
router.delete('/vaciar/:id?',middlewareAutenticacion , controladorUsuario.eliminarPerfilUsuario);

module.exports = router;