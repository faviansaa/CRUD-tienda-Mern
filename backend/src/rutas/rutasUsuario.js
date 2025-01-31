const cors = require('cors');
const express = require ('express');
const router = express.Router();
const controladorUsuario = require('../controladores/usuarioController');
const middlewareAutenticacion = require('../middleware/middlewareAutenticacion')
//Rutas Usuario

router.get('/:id?', controladorUsuario.obtenerPerfilUsuario)
router.put('/actualizar/:id', controladorUsuario.actualizarPerfilUsuario)
router.delete('/vaciar/:id?', controladorUsuario.eliminarPerfilUsuario)

router.post('/auth/registrar', controladorUsuario.registrarUsuario); // Registro de usuario
router.post('/auth/iniciarSesion', controladorUsuario.IniciarSesion); // Inicio de sesión


router.get('/perfil', middlewareAutenticacion, controladorUsuario.obtenerPerfilUsuario);
router.put('/perfil', middlewareAutenticacion, controladorUsuario.actualizarPerfilUsuario);module.exports = router;